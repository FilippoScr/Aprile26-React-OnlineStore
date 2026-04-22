import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function fillCart(item, qnt) {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);

      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, qnt: p.qnt + qnt }
            : p
        );
      }

      return [...prev, { ...item, qnt }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function updateQnt(id, newQnt) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qnt: newQnt } : item
      )
    );
  }

  const qntTotalProducts = String(cart.reduce((sum, item) => sum + item.qnt, 0)).padStart(2, "0");

  const totalCart = "€" + cart.reduce((sum, item) => sum + item.price * item.qnt, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, setCart, fillCart, removeFromCart, updateQnt, qntTotalProducts, totalCart }}>
      {children}
    </CartContext.Provider>
  );
}