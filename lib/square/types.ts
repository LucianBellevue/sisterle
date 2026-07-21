export type StorefrontChannel = "sisterle" | "depop";

export type StorefrontProduct = {
  id: string;
  variationId: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  quantity: number;
  trackInventory: boolean;
  soldOut: boolean;
  channel: StorefrontChannel;
  depopUrl: string | null;
  purchasable: boolean;
};

export type CatalogFetchResult = {
  sisterle: StorefrontProduct[];
  depop: StorefrontProduct[];
  available: boolean;
  error?: string;
};

export type CheckoutLineInput = {
  variationId: string;
  quantity: number;
};
