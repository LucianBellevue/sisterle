"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </Provider>
  );
}
