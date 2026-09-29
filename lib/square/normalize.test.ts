import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Square } from "square";
import { normalizeCatalogItem } from "./normalize";
import { validateCheckoutLines } from "./validate-checkout";
import { moneyAmountToCents, formatMoney } from "./money";

function makeItem(overrides?: {
  depopUrl?: string;
  quantity?: number;
  soldOut?: boolean;
  priceCents?: number;
  archived?: boolean;
}): Square.CatalogObject.Item {
  const variationId = "VAR_1";
  return {
    type: "ITEM",
    id: "ITEM_1",
    customAttributeValues: overrides?.depopUrl
      ? {
          depop_url: {
            key: "depop_url",
            name: "Depop URL",
            type: "STRING",
            stringValue: overrides.depopUrl,
          },
        }
      : undefined,
    itemData: {
      name: "Silk slip",
      descriptionPlaintext: "Vintage satin.",
      isArchived: overrides?.archived ?? false,
      imageIds: ["IMG_1"],
      variations: [
        {
          type: "ITEM_VARIATION",
          id: variationId,
          itemVariationData: {
            itemId: "ITEM_1",
            name: "Regular",
            pricingType: "FIXED_PRICING",
            priceMoney: {
              amount: BigInt(overrides?.priceCents ?? 4500),
              currency: "USD",
            },
            trackInventory: true,
            locationOverrides: [
              {
                locationId: "LOC_1",
                trackInventory: true,
                soldOut: overrides?.soldOut ?? false,
              },
            ],
          },
        },
      ],
    },
  };
}

describe("money helpers", () => {
  it("converts bigint amounts to cents", () => {
    assert.equal(moneyAmountToCents(BigInt(1299)), 1299);
    assert.equal(formatMoney(1299, "USD"), "$12.99");
  });
});

describe("normalizeCatalogItem", () => {
  it("marks sisterle items purchasable when in stock", () => {
    const product = normalizeCatalogItem({
      item: makeItem({ quantity: 1 }),
      imageUrlById: new Map([["IMG_1", "https://example.com/a.jpg"]]),
      quantityByVariationId: new Map([["VAR_1", 1]]),
      locationId: "LOC_1",
    });

    assert.ok(product);
    assert.equal(product.channel, "sisterle");
    assert.equal(product.purchasable, true);
    assert.equal(product.imageUrl, "https://example.com/a.jpg");
    assert.deepEqual(product.imageUrls, ["https://example.com/a.jpg"]);
    assert.equal(product.priceCents, 4500);
  });

  it("collects all image URLs in catalog order", () => {
    const product = normalizeCatalogItem({
      item: {
        ...makeItem(),
        itemData: {
          ...makeItem().itemData!,
          imageIds: ["IMG_1", "IMG_2", "IMG_3"],
        },
      },
      imageUrlById: new Map([
        ["IMG_1", "https://example.com/1.jpg"],
        ["IMG_2", "https://example.com/2.jpg"],
      ]),
      quantityByVariationId: new Map([["VAR_1", 1]]),
      locationId: "LOC_1",
    });
    assert.ok(product);
    assert.deepEqual(product.imageUrls, [
      "https://example.com/1.jpg",
      "https://example.com/2.jpg",
    ]);
  });

  it("routes valid Depop URLs to the depop channel", () => {
    const product = normalizeCatalogItem({
      item: makeItem({
        depopUrl: "https://www.depop.com/products/example-item/",
      }),
      imageUrlById: new Map(),
      quantityByVariationId: new Map([["VAR_1", 1]]),
      locationId: "LOC_1",
    });

    assert.ok(product);
    assert.equal(product.channel, "depop");
    assert.equal(product.purchasable, false);
    assert.equal(
      product.depopUrl,
      "https://www.depop.com/products/example-item/",
    );
  });

  it("marks tracked zero-stock sisterle items as sold out", () => {
    const product = normalizeCatalogItem({
      item: makeItem(),
      imageUrlById: new Map(),
      quantityByVariationId: new Map([["VAR_1", 0]]),
      locationId: "LOC_1",
    });

    assert.ok(product);
    assert.equal(product.soldOut, true);
    assert.equal(product.purchasable, false);
  });

  it("skips archived items", () => {
    const product = normalizeCatalogItem({
      item: makeItem({ archived: true }),
      imageUrlById: new Map(),
      quantityByVariationId: new Map([["VAR_1", 1]]),
      locationId: "LOC_1",
    });
    assert.equal(product, null);
  });
});

describe("validateCheckoutLines", () => {
  it("accepts unique positive integer lines", () => {
    const result = validateCheckoutLines([
      { variationId: "VAR_1", quantity: 1 },
      { variationId: "VAR_2", quantity: 1 },
    ]);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.lines.length, 2);
    }
  });

  it("rejects empty carts and duplicates", () => {
    assert.equal(validateCheckoutLines([]).ok, false);
    const dup = validateCheckoutLines([
      { variationId: "VAR_1", quantity: 1 },
      { variationId: "VAR_1", quantity: 1 },
    ]);
    assert.equal(dup.ok, false);
    if (!dup.ok) {
      assert.equal(dup.error.code, "INVALID_LINE");
    }
  });
});
