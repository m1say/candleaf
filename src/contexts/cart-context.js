import { useEffect, useState } from "react";
import React from "react";

export const cart = {
  items: [],
  count: 0,
};

export const CartContext = React.createContext(cart);

export const CartProvider = ({ children }) => {
  let items = {};
  if (typeof window !== "undefined") {
    items = JSON.parse(window.localStorage.getItem("cart") || "{}");
  }

  const [cartItems, setCartItems] = useState(items);
  const [cartCount, setCartCount] = useState(Object.keys(items).length);

  useEffect(() => {
    setCartCount(Object.keys(cartItems).length);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addOrUpdateItem = (key, quantity, override = false) => {
    const cart = { ...cartItems };
    if (cartItems.hasOwnProperty(key) && !override) {
      cart[key] = cart[key] + quantity;
    } else {
      cart[key] = quantity;
    }
    setCartItems(cart);
  };

  const removeItem = (key) => {
    const cart = { ...cartItems };
    delete cart[key];
    setCartItems(cart);
  };

  const resetCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addOrUpdateItem, removeItem, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
