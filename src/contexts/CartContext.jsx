// CartContext.jsx
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

  /* Calcola la quantità totale di prodotti nel carrello (somma di tutte le qnt).
  Il risultato numerico viene poi convertito in stringa e formattato a due cifre con padStart(2, "0") per garantire un formato uniforme negli ordini.
  Esempi: 1 → "01", 7 → "07", 13 → "13".
  Questa formattazione serve esclusivamente per la stringa numberOrder e non modifica gli ID originali dei prodotti nel carrello. 
  */
  const qntTotalProducts = String(cart.reduce((sum, item) => sum + item.qnt, 0)).padStart(2, "0");

  const totalCart = "€" + cart.reduce((sum, item) => sum + item.price * item.qnt, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, setCart, fillCart, removeFromCart, updateQnt, qntTotalProducts, totalCart }}>
      {children}
    </CartContext.Provider>
  );
}