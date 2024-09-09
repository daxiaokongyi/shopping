import './CartDropdown.scss';
import Button from '../button.jsx/Button';
import CartItem from '../cartItem/CartItem';
import { CartContext } from '../contexts/cartContext';
import { useContext } from 'react';

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)}
      </div>
      <Button><span style={{fontSize: '12px'}}>GO TO CHECKOUT</span></Button>
    </div>
  )
}

export default CartDropdown;