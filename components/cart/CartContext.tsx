"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
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

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  clearCart: () => void;

  totalItems: number;
  totalPrice: number;
}

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD ITEM
  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) => cartItem.id === item.id
      );

      // Item already exists → increase quantity
      if (existingItem) {
        return previousCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      // New item
      return [
        ...previousCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    // ONE toast only
    toast.success(
      `🛒 ${item.name} added to cart`
    );
  };

  // PLUS
  const increaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // MINUS
  const decreaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // DELETE
  const removeFromCart = (id: number) => {
    setCart((previousCart) => {
      const item = previousCart.find(
        (cartItem) => cartItem.id === id
      );

      if (item) {
        toast.error(
          `❌ ${item.name} removed from cart`
        );
      }

      return previousCart.filter(
        (cartItem) => cartItem.id !== id
      );
    });
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    toast.success("🛍️ Cart cleared");
  };

  // TOTAL ITEMS
  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cart]);

  // TOTAL PRICE
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );
  }, [cart]);

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
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}