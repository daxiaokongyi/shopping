import { createContext, useReducer } from "react";
import { createAction } from "../../utils/reducer/reducer";

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

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0
}

const cartReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}


export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const {isCartOpen, cartItems, cartCount, totalPrice} = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((totalPrice, cartItem) => totalPrice += cartItem.quantity * cartItem.price, 0);
    const updatedNewCartItems = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      totalPrice: newCartTotal
    }
    
    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, updatedNewCartItems));
  }

  const adddItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, {isCartOpen: bool}))

  const value = {
    isCartOpen, 
    setIsCartOpen, 
    adddItemToCart, 
    removeItemFromCart, 
    clearItemFromCart, 
    cartItems, 
    cartCount, 
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}