import { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function isInWishlist(id) {
    return wishlist.some(item => item.id === id);
  }

  function add(item) {
    setWishlist(prev => [...prev, item]);
  }
  function remove(id) {
    setWishlist(prev => prev.filter(item => item.id !== id));
  }

  function addRemoveFavorite(item) {
    isInWishlist(item.id) ? remove(item.id) : add(item);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, add, remove, addRemoveFavorite, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
