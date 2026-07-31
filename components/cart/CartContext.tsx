"use client";

import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        toast.success(`➕ ${item.name} quantity increased`);

        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      toast.success(`🛒 ${item.name} added to cart`);

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          toast.success(`➕ ${i.name} quantity increased`);

          return {
            ...i,
            quantity: i.quantity + 1,
          };
        }

        return i;
      })
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            toast(`➖ ${i.name} quantity decreased`);

            return {
              ...i,
              quantity: i.quantity - 1,
            };
          }

          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);

    if (item) {
      toast.error(`❌ ${item.name} removed from cart`);
    }

    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    toast.success("🛍️ Cart cleared");
    setCart([]);
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}