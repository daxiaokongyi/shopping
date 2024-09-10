import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  adddItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalPrice: 0
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  
  return cartItems.map((cartItem) => 
    cartItem.id === existingCartItem.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0);
    setTotalPrice(newCartTotal);
  }, [cartItems]);

  const adddItemToCart = (productToAdd) => {
    return setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    return setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    return setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = {isCartOpen, setIsCartOpen, adddItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, totalPrice};

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}