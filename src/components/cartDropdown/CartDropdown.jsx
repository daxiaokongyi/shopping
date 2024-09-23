import './CartDropdown.scss';
import Button from '../button/Button';
import CartItem from '../cartItem/CartItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cartSelector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
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