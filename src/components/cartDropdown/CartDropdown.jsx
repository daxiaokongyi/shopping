import './CartDropdown.scss';
import Button from '../button.jsx/Button';
import CartItem from '../cartItem/CartItem';
import { CartContext } from '../contexts/cartContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.length !== 0 
            ? cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>) 
            : <span className='empty-message'>Your cart is empty</span>
        }
      </div>
      <Button onClick={goToCheckoutHandler}>
        <span style={{fontSize: '12px'}}>GO TO CHECKOUT</span>
      </Button>
    </div>
  )
}

export default CartDropdown;