/**
 * One-time Square setup: creates the seller-visible "Depop URL" catalog
 * custom attribute used to separate Depop-mirrored items from Sisterle shop items.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/setup-square.ts
 */
import { randomUUID } from "crypto";
import { SquareClient, SquareEnvironment } from "square";
import {
  DEPOP_URL_ATTRIBUTE_DESCRIPTION,
  DEPOP_URL_ATTRIBUTE_KEY,
  DEPOP_URL_ATTRIBUTE_NAME,
} from "../lib/square/constants";

async function main() {
  const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new Error("Set SQUARE_ACCESS_TOKEN before running setup.");
  }

  const envName = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase();
  const environment =
    envName === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox;

  const client = new SquareClient({ token, environment });

  const existing = await client.catalog.list({
    types: "CUSTOM_ATTRIBUTE_DEFINITION",
  });

  for await (const object of existing) {
    if (
      object.type === "CUSTOM_ATTRIBUTE_DEFINITION" &&
      (object.customAttributeDefinitionData?.key === DEPOP_URL_ATTRIBUTE_KEY ||
        object.customAttributeDefinitionData?.name === DEPOP_URL_ATTRIBUTE_NAME)
    ) {
      console.log(
        `Depop URL attribute already exists (id=${object.id}, key=${object.customAttributeDefinitionData?.key}).`,
      );
      return;
    }
  }

  const response = await client.catalog.object.upsert({
    idempotencyKey: randomUUID(),
    object: {
      type: "CUSTOM_ATTRIBUTE_DEFINITION",
      id: `#${DEPOP_URL_ATTRIBUTE_KEY}`,
      customAttributeDefinitionData: {
        type: "STRING",
        name: DEPOP_URL_ATTRIBUTE_NAME,
        description: DEPOP_URL_ATTRIBUTE_DESCRIPTION,
        key: DEPOP_URL_ATTRIBUTE_KEY,
        allowedObjectTypes: ["ITEM"],
        sellerVisibility: "SELLER_VISIBILITY_READ_WRITE_VALUES",
        appVisibility: "APP_VISIBILITY_READ_WRITE_VALUES",
        stringConfig: {
          enforceUniqueness: false,
        },
      },
    },
  });

  const created = response.catalogObject;
  console.log(
    `Created Depop URL custom attribute (id=${created?.id}, key=${DEPOP_URL_ATTRIBUTE_KEY}).`,
  );
  console.log(
    "In Square Dashboard → Item library → edit an item → set Depop URL for Depop-only listings.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
