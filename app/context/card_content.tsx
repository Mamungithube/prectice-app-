import React, { createContext, useContext, useState, ReactNode } from 'react';

// ১. টাইপ নির্ধারণ
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  totalPrice: number;
  updateQuantity: (id: number, type: 'increase' | 'decrease') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ২. প্রোভাইডার তৈরি
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, type: 'increase' | 'decrease') => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice ,updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};