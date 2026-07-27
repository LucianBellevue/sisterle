"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingDots } from "@/components/FloatingDots";
import { MobileNavigation } from "@/components/nav/MobileNavigation";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        {/* Acid-wash + dots share one stacking context so dots paint above the
            background and below page content (same pattern as the old homepage). */}
        <div className="acid-wash-bg relative min-h-full overflow-x-hidden">
          <FloatingDots />
          <MobileNavigation />
          <div className="mobile-page-shell relative z-10">{children}</div>
          <CartDrawer />
        </div>
      </CartProvider>
    </Provider>
  );
}
