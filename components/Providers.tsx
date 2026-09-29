"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileNavigation } from "@/components/nav/MobileNavigation";
import { PlaidStarField } from "@/components/PlaidStarField";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        <div className="acid-wash-bg relative min-h-full overflow-x-hidden">
          <PlaidStarField />
          <MobileNavigation />
          <div className="mobile-page-shell relative z-10">{children}</div>
          <CartDrawer />
        </div>
      </CartProvider>
    </Provider>
  );
}
