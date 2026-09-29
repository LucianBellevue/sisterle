import "server-only";

import type { Square } from "square";
import {
  getSquareClient,
  getSquareLocationId,
  isSquareConfigured,
} from "@/lib/square/client";
import {
  normalizeCatalogItem,
  pickPrimaryVariation,
} from "@/lib/square/normalize";
import type {
  CatalogFetchResult,
  StorefrontProduct,
} from "@/lib/square/types";

export { normalizeCatalogItem } from "@/lib/square/normalize";

async function listAllCatalogObjects(
  types: string,
): Promise<Square.CatalogObject[]> {
  const client = getSquareClient();
  const objects: Square.CatalogObject[] = [];
  const page = await client.catalog.list({ types });

  for await (const object of page) {
    objects.push(object);
  }

  return objects;
}

async function getInventoryQuantities(
  variationIds: string[],
  locationId: string,
): Promise<Map<string, number>> {
  const quantities = new Map<string, number>();
  if (variationIds.length === 0) return quantities;

  const client = getSquareClient();
  const page = await client.inventory.batchGetCounts({
    catalogObjectIds: variationIds,
    locationIds: [locationId],
  });

  for await (const count of page) {
    if (
      count.state === "IN_STOCK" &&
      count.catalogObjectId &&
      count.quantity != null
    ) {
      const qty = Number(count.quantity);
      if (Number.isFinite(qty)) {
        quantities.set(count.catalogObjectId, qty);
      }
    }
  }

  return quantities;
}

export async function fetchStorefrontCatalog(): Promise<CatalogFetchResult> {
  if (!isSquareConfigured()) {
    return {
      sisterle: [],
      depop: [],
      available: false,
      error: "Square is not configured.",
    };
  }

  try {
    const locationId = getSquareLocationId();
    const objects = await listAllCatalogObjects("ITEM,IMAGE");

    const imageUrlById = new Map<string, string>();
    const items: Square.CatalogObject.Item[] = [];

    for (const object of objects) {
      if (object.type === "IMAGE" && object.imageData?.url) {
        imageUrlById.set(object.id, object.imageData.url);
      }
      if (object.type === "ITEM") {
        items.push(object);
      }
    }

    const variationIds: string[] = [];
    for (const item of items) {
      const variation = pickPrimaryVariation(item);
      if (variation?.id) variationIds.push(variation.id);
    }

    const quantityByVariationId = await getInventoryQuantities(
      variationIds,
      locationId,
    );

    const sisterle: StorefrontProduct[] = [];
    const depop: StorefrontProduct[] = [];

    for (const item of items) {
      const product = normalizeCatalogItem({
        item,
        imageUrlById,
        quantityByVariationId,
        locationId,
      });
      if (!product) continue;
      if (product.channel === "depop") {
        depop.push(product);
      } else {
        sisterle.push(product);
      }
    }

    sisterle.sort((a, b) => a.name.localeCompare(b.name));
    depop.sort((a, b) => a.name.localeCompare(b.name));

    return { sisterle, depop, available: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load Square catalog.";
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? error.cause.message
        : null;
    console.error(
      "[square/catalog]",
      cause ? `${message} (${cause})` : message,
    );
    return {
      sisterle: [],
      depop: [],
      available: false,
      error: message,
    };
  }
}

export async function getProductsByVariationIds(
  variationIds: string[],
): Promise<Map<string, StorefrontProduct>> {
  const result = new Map<string, StorefrontProduct>();
  if (!isSquareConfigured() || variationIds.length === 0) return result;

  const client = getSquareClient();
  const locationId = getSquareLocationId();

  const response = await client.catalog.batchGet({
    objectIds: variationIds,
    includeRelatedObjects: true,
  });

  const imageUrlById = new Map<string, string>();
  const itemById = new Map<string, Square.CatalogObject.Item>();
  const variationById = new Map<string, Square.CatalogObject.ItemVariation>();

  const collect = (object: Square.CatalogObject | undefined) => {
    if (!object) return;
    if (object.type === "IMAGE" && object.imageData?.url) {
      imageUrlById.set(object.id, object.imageData.url);
    }
    if (object.type === "ITEM") {
      itemById.set(object.id, object);
    }
    if (object.type === "ITEM_VARIATION") {
      variationById.set(object.id, object);
    }
  };

  for (const object of response.objects ?? []) collect(object);
  for (const object of response.relatedObjects ?? []) collect(object);

  const missingItemIds = new Set<string>();
  for (const variationId of variationIds) {
    const variation = variationById.get(variationId);
    const itemId = variation?.itemVariationData?.itemId;
    if (itemId && !itemById.has(itemId)) {
      missingItemIds.add(itemId);
    }
  }

  if (missingItemIds.size > 0) {
    const parents = await client.catalog.batchGet({
      objectIds: [...missingItemIds],
      includeRelatedObjects: true,
    });
    for (const object of parents.objects ?? []) collect(object);
    for (const object of parents.relatedObjects ?? []) collect(object);
  }

  const quantities = await getInventoryQuantities(variationIds, locationId);

  for (const variationId of variationIds) {
    const variation = variationById.get(variationId);
    const itemId =
      variation?.itemVariationData?.itemId ??
      [...itemById.values()].find((item) =>
        item.itemData?.variations?.some((v) => v.id === variationId),
      )?.id;
    const item = itemId ? itemById.get(itemId) : undefined;
    if (!item || !variation) continue;

    const itemWithVariation: Square.CatalogObject.Item = {
      ...item,
      itemData: {
        ...item.itemData,
        variations:
          item.itemData?.variations?.some((v) => v.id === variationId)
            ? item.itemData.variations
            : [...(item.itemData?.variations ?? []), variation],
      },
    };

    const product = normalizeCatalogItem({
      item: itemWithVariation,
      imageUrlById,
      quantityByVariationId: quantities,
      locationId,
      preferredVariationId: variationId,
    });
    if (product && product.variationId === variationId) {
      result.set(variationId, product);
    }
  }

  return result;
}

export async function getProductByItemId(
  itemId: string,
): Promise<StorefrontProduct | null> {
  if (!isSquareConfigured() || !itemId.trim()) return null;

  try {
    const client = getSquareClient();
    const locationId = getSquareLocationId();
    const response = await client.catalog.object.get({
      objectId: itemId,
      includeRelatedObjects: true,
    });

    const object = response.object;
    if (!object || object.type !== "ITEM") return null;

    const imageUrlById = new Map<string, string>();
    for (const related of response.relatedObjects ?? []) {
      if (related.type === "IMAGE" && related.imageData?.url) {
        imageUrlById.set(related.id, related.imageData.url);
      }
    }

    // Also resolve image IDs that weren't in relatedObjects
    const missingImageIds = (object.itemData?.imageIds ?? []).filter(
      (id) => !imageUrlById.has(id),
    );
    if (missingImageIds.length > 0) {
      const images = await client.catalog.batchGet({
        objectIds: missingImageIds,
      });
      for (const img of images.objects ?? []) {
        if (img.type === "IMAGE" && img.imageData?.url) {
          imageUrlById.set(img.id, img.imageData.url);
        }
      }
    }

    const variation = pickPrimaryVariation(object);
    const quantities = variation?.id
      ? await getInventoryQuantities([variation.id], locationId)
      : new Map<string, number>();

    return normalizeCatalogItem({
      item: object,
      imageUrlById,
      quantityByVariationId: quantities,
      locationId,
    });
  } catch (error) {
    console.error("[square/getProductByItemId]", error);
    return null;
  }
}
