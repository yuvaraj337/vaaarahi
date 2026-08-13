"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: string | number;
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

  removeFromCart: (
    id: string | number
  ) => void;

  increaseQuantity: (
    id: string | number
  ) => void;

  decreaseQuantity: (
    id: string | number
  ) => void;

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
        (cartItem) =>
          String(cartItem.id) === String(item.id)
      );

      // Item already exists → increase quantity
      if (existingItem) {
        return previousCart.map((cartItem) =>
          String(cartItem.id) === String(item.id)
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
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
  };

  // PLUS
  const increaseQuantity = (
    id: string | number
  ) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // MINUS
  const decreaseQuantity = (
    id: string | number
  ) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          String(item.id) === String(id)
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
  const removeFromCart = (
    id: string | number
  ) => {
    setCart((previousCart) => {
      const item = previousCart.find(
        (cartItem) =>
          String(cartItem.id) === String(id)
      );

      if (item) {
        toast.error(
          `❌ ${item.name} removed from cart`
        );
      }

      return previousCart.filter(
        (cartItem) =>
          String(cartItem.id) !== String(id)
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