import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import './checkoutItem.scss';

const CheckoutItem = ({cartItem}) => {
  const {imageUrl, name, price, quantity} = cartItem;
  const {adddItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => adddItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`}/>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem;