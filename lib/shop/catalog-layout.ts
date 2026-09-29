export type CatalogDensity = "solo" | "standard" | "compact";

export const CATALOG_COMPACT_THRESHOLD = 10;
export const CATALOG_PAGE_SIZE = 12;

export type CatalogLayout = {
  density: CatalogDensity;
  paginate: boolean;
  pageSize: number;
};

export function getCatalogLayout(productCount: number): CatalogLayout {
  if (productCount <= 0) {
    return { density: "standard", paginate: false, pageSize: 0 };
  }
  if (productCount === 1) {
    return { density: "solo", paginate: false, pageSize: 1 };
  }
  if (productCount > CATALOG_COMPACT_THRESHOLD) {
    return {
      density: "compact",
      paginate: true,
      pageSize: CATALOG_PAGE_SIZE,
    };
  }
  return {
    density: "standard",
    paginate: false,
    pageSize: productCount,
  };
}

export function paginateProducts<T>(items: T[], page: number, pageSize: number): T[] {
  if (pageSize <= 0) return items;
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}

export function catalogPageCount(productCount: number, pageSize: number): number {
  if (productCount <= 0 || pageSize <= 0) return 1;
  return Math.ceil(productCount / pageSize);
}

/** Outer shop bento shell — layout + CSS modifiers from inventory size */
export function getCatalogShellModifiers(productCount: number): {
  layout: CatalogLayout;
  modifier: CatalogDensity | "empty";
} {
  if (productCount <= 0) {
    return {
      layout: getCatalogLayout(0),
      modifier: "empty",
    };
  }
  const layout = getCatalogLayout(productCount);
  return { layout, modifier: layout.density };
}
