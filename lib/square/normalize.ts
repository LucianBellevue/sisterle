import type { Square } from "square";
import { DEPOP_URL_ATTRIBUTE_KEY } from "@/lib/square/constants";
import { moneyAmountToCents } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function readDepopUrl(
  customAttributeValues:
    | Record<string, Square.CatalogCustomAttributeValue>
    | null
    | undefined,
): string | null {
  if (!customAttributeValues) return null;

  const direct = customAttributeValues[DEPOP_URL_ATTRIBUTE_KEY];
  if (direct?.stringValue?.trim()) {
    return direct.stringValue.trim();
  }

  for (const value of Object.values(customAttributeValues)) {
    if (
      value.key === DEPOP_URL_ATTRIBUTE_KEY ||
      value.key?.endsWith(`:${DEPOP_URL_ATTRIBUTE_KEY}`) ||
      value.name === "Depop URL"
    ) {
      const url = value.stringValue?.trim();
      if (url) return url;
    }
  }

  return null;
}

function variationTrackInventory(
  variation: Square.CatalogObject.ItemVariation,
  locationId: string,
): boolean {
  const override = variation.itemVariationData?.locationOverrides?.find(
    (entry) => entry.locationId === locationId,
  );
  if (typeof override?.trackInventory === "boolean") {
    return override.trackInventory;
  }
  return Boolean(variation.itemVariationData?.trackInventory);
}

function variationSoldOut(
  variation: Square.CatalogObject.ItemVariation,
  locationId: string,
): boolean {
  const override = variation.itemVariationData?.locationOverrides?.find(
    (entry) => entry.locationId === locationId,
  );
  return Boolean(override?.soldOut);
}

export function pickPrimaryVariation(
  item: Square.CatalogObject.Item,
  preferredVariationId?: string,
): Square.CatalogObject.ItemVariation | null {
  const variations = item.itemData?.variations ?? [];

  if (preferredVariationId) {
    for (const candidate of variations) {
      if (
        candidate.type === "ITEM_VARIATION" &&
        !candidate.isDeleted &&
        candidate.id === preferredVariationId
      ) {
        return candidate;
      }
    }
  }

  for (const candidate of variations) {
    if (candidate.type === "ITEM_VARIATION" && !candidate.isDeleted) {
      return candidate;
    }
  }
  return null;
}

export function normalizeCatalogItem(params: {
  item: Square.CatalogObject.Item;
  imageUrlById: Map<string, string>;
  quantityByVariationId: Map<string, number>;
  locationId: string;
  preferredVariationId?: string;
}): StorefrontProduct | null {
  const {
    item,
    imageUrlById,
    quantityByVariationId,
    locationId,
    preferredVariationId,
  } = params;

  if (item.isDeleted || item.itemData?.isArchived) return null;

  const variation = pickPrimaryVariation(item, preferredVariationId);
  if (!variation?.id) return null;

  const depopRaw = readDepopUrl(item.customAttributeValues);
  const validDepopUrl =
    depopRaw && isValidHttpUrl(depopRaw) ? depopRaw : null;

  const imageIds = item.itemData?.imageIds ?? [];
  const imageUrl =
    imageIds.map((id) => imageUrlById.get(id)).find(Boolean) ?? null;

  const priceCents = moneyAmountToCents(
    variation.itemVariationData?.priceMoney?.amount,
  );
  const currency =
    variation.itemVariationData?.priceMoney?.currency ?? "USD";

  const trackInventory = variationTrackInventory(variation, locationId);
  const soldOutFlag = variationSoldOut(variation, locationId);
  const quantity = quantityByVariationId.get(variation.id) ?? 0;

  const soldOut = soldOutFlag || (trackInventory && quantity <= 0);

  const channel = validDepopUrl ? "depop" : "sisterle";
  const purchasable = channel === "sisterle" && !soldOut && priceCents > 0;

  const description =
    item.itemData?.descriptionPlaintext?.trim() ||
    (item.itemData?.descriptionHtml
      ? stripHtml(item.itemData.descriptionHtml)
      : "") ||
    item.itemData?.description?.trim() ||
    "";

  return {
    id: item.id,
    variationId: variation.id,
    name: item.itemData?.name?.trim() || "Untitled item",
    description,
    priceCents,
    currency,
    imageUrl,
    quantity: trackInventory ? quantity : 1,
    trackInventory,
    soldOut,
    channel,
    depopUrl: validDepopUrl,
    purchasable,
  };
}
