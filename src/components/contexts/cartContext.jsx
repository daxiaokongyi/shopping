import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  adddItemToCart: () => {},
  cartCount: 0
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return (
        cartItem.id === existingCartItem.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
      )
    })
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
  }, [cartItems]);
  const adddItemToCart = (productToAdd) => {
    return setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = {isCartOpen, setIsCartOpen, adddItemToCart, cartItems, cartCount};

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}