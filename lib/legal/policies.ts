import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export type PolicySection = {
  heading: string;
  paragraphs: string[];
};

export type PolicyDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export const LEGAL_ROUTES = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/contact", label: "Contact" },
] as const;

export const privacyPolicy: PolicyDocument = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your information when you shop at sisterle.shop.`,
  lastUpdated: "2026-07-27",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `${SITE_NAME} ("we", "us") operates sisterle.shop, a curated thrift and vintage shop. You can reach us at ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "When you browse the site, we may collect basic usage data such as pages viewed, device type, and approximate location through analytics tools if you accept cookies.",
        "When you checkout on Sisterle, payment and order details are collected by Square, our payment processor. That includes your name, email, shipping address, and payment information. We do not store full card numbers on our servers.",
        "When you contact us by email or Depop, we receive the information you choose to send.",
      ],
    },
    {
      heading: "How we use information",
      paragraphs: [
        "We use order information to fulfill purchases, send receipts, provide customer support, and prevent fraud.",
        "We use analytics, when enabled and consented to, to understand site traffic and improve the shopping experience.",
        "We do not sell your personal information.",
      ],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "Square processes payments and may handle tax, shipping, and receipt emails according to their policies.",
        "Google Analytics may be used if you opt in to analytics cookies. Google's privacy policy applies to that data.",
        "Depop purchases happen on Depop's website and are governed by Depop's policies, not checkout on sisterle.shop.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "We use essential cookies or local storage for cart functionality.",
        "Analytics cookies are optional and only activated if you accept them in our cookie banner.",
        "You can clear cookies in your browser settings at any time.",
      ],
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We keep order-related records as long as needed for accounting, tax, and customer support. Analytics data retention follows the settings in our analytics provider.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You may request access, correction, or deletion of personal data we hold by emailing ${CONTACT_EMAIL}. We will respond within a reasonable time.`,
        "Depending on where you live, you may have additional privacy rights under local law.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update this policy as the shop or legal requirements change. The date at the top of this page shows when it was last revised.",
      ],
    },
  ],
};

export const termsOfService: PolicyDocument = {
  title: "Terms of Service",
  description: `Terms for browsing and purchasing from ${SITE_NAME} at sisterle.shop.`,
  lastUpdated: "2026-07-27",
  sections: [
    {
      heading: "Agreement",
      paragraphs: [
        `By using sisterle.shop, you agree to these Terms of Service. If you do not agree, please do not use the site.`,
      ],
    },
    {
      heading: "Shop overview",
      paragraphs: [
        `${SITE_NAME} sells curated thrift, vintage, and one-of-one items. Items listed under Shop Sisterle checkout on this site through Square. Items listed under On Depop link to Depop and are purchased there under Depop's terms.`,
      ],
    },
    {
      heading: "Product descriptions",
      paragraphs: [
        "We describe condition, measurements, and details as accurately as possible. Vintage and pre-loved items may show normal wear. Photos represent the actual item unless stated otherwise.",
        "Most inventory is one-of-one. Availability can change quickly if another customer completes checkout first.",
      ],
    },
    {
      heading: "Pricing and payment",
      paragraphs: [
        "Prices are shown in the currency listed on each item. Taxes and shipping may be calculated at Square checkout.",
        "Payment is processed securely by Square. By placing an order, you authorize the charge for your purchase.",
      ],
    },
    {
      heading: "Order acceptance",
      paragraphs: [
        "Your order is confirmed when payment is successfully processed. We may cancel an order and issue a refund if an item is unavailable, mislisted, or if fraud is suspected.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "Site content, branding, photos, and text belong to Sisterle unless otherwise noted. Do not copy or reuse shop content without permission.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Sisterle is not liable for indirect or consequential damages arising from use of the site or purchase of goods. Our liability for any order is limited to the amount you paid for that order.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about these terms? Email ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const shippingPolicy: PolicyDocument = {
  title: "Shipping Policy",
  description: `How ${SITE_NAME} ships orders placed on sisterle.shop.`,
  lastUpdated: "2026-07-27",
  sections: [
    {
      heading: "Scope",
      paragraphs: [
        "This policy applies to orders placed and paid for on sisterle.shop through Square checkout. Depop orders ship according to the listing and Depop's checkout flow.",
      ],
    },
    {
      heading: "Processing time",
      paragraphs: [
        "Orders are typically packed within 1–3 business days after payment clears. During busy drop weeks, processing may take a little longer—we will email you if there is a delay.",
      ],
    },
    {
      heading: "Shipping methods and rates",
      paragraphs: [
        "Shipping options and costs are shown during Square checkout based on your address and the rates configured in our Square account.",
        "We ship to addresses you provide at checkout. Please double-check your shipping details before paying.",
      ],
    },
    {
      heading: "Tracking",
      paragraphs: [
        "When tracking is available, we add it to the order in Square and you should receive updates from Square or by email once the package ships.",
      ],
    },
    {
      heading: "Lost or delayed packages",
      paragraphs: [
        `If your package is significantly delayed or appears lost, contact us at ${CONTACT_EMAIL} with your order reference and we will help investigate with the carrier.`,
      ],
    },
    {
      heading: "International shipping",
      paragraphs: [
        "If international shipping is offered at checkout, you are responsible for any customs duties, import taxes, or fees charged by your country.",
      ],
    },
  ],
};

export const returnsPolicy: PolicyDocument = {
  title: "Returns & Refunds",
  description: `Return and refund policy for ${SITE_NAME} orders on sisterle.shop.`,
  lastUpdated: "2026-07-27",
  sections: [
    {
      heading: "All sales context",
      paragraphs: [
        "Most Sisterle pieces are one-of-one vintage or thrift finds. Please review photos, descriptions, and measurements carefully before buying.",
      ],
    },
    {
      heading: "When we accept returns",
      paragraphs: [
        "We accept returns or offer refunds if an item arrives significantly not as described, damaged in transit, or if we shipped the wrong item.",
        "Contact us within 7 days of delivery with photos and your order reference so we can review the issue.",
      ],
    },
    {
      heading: "When returns are not accepted",
      paragraphs: [
        "We generally do not accept returns for change of mind, fit preference when measurements were provided, or normal vintage wear that was shown in listing photos.",
        "Depop purchases must be handled through Depop's buyer protection and seller policies.",
      ],
    },
    {
      heading: "Refund process",
      paragraphs: [
        "Approved refunds are issued to the original payment method through Square. Refund timing depends on your bank or card issuer.",
        "If a return is approved, we will provide return shipping instructions. Items must be sent back unworn and in the same condition received unless damage occurred in transit.",
      ],
    },
    {
      heading: "Cancellations",
      paragraphs: [
        "If you need to cancel before shipment, email us immediately at " +
          CONTACT_EMAIL +
          ". Once an order has shipped, our return policy above applies.",
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        `Email ${CONTACT_EMAIL} for help with a specific order. Include your name, order reference, and photos if relevant.`,
      ],
    },
  ],
};
