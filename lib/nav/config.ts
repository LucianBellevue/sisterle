import type { SectionId } from "@/store/uiSlice";

export type NavLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  sectionId?: SectionId;
};

export const PRIMARY_SECTIONS: NavLink[] = [
  { id: "info", label: "Info 💌", href: "/#info", sectionId: "info" },
  { id: "about", label: "About 🪡", href: "/#about", sectionId: "about" },
  { id: "shop", label: "Shop 🛍️", href: "/#shop", sectionId: "shop" },
  { id: "depop", label: "On Depop 👗", href: "/#depop", sectionId: "depop" },
  { id: "contact", label: "Contact ✉️", href: "/#contact", sectionId: "contact" },
];

export const MOBILE_TABS: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "shop", label: "Shop", href: "/#shop", sectionId: "shop" },
  { id: "depop", label: "Depop", href: "/#depop", sectionId: "depop" },
];

export const MENU_LINKS: NavLink[] = [
  ...PRIMARY_SECTIONS,
  { id: "contact-page", label: "Contact page 📝", href: "/contact" },
  { id: "privacy", label: "Privacy", href: "/privacy" },
  { id: "terms", label: "Terms", href: "/terms" },
  { id: "shipping", label: "Shipping", href: "/shipping" },
  { id: "returns", label: "Returns", href: "/returns" },
];
