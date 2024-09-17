import { useSelector } from 'react-redux';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { selectCartIsOpen, selectCartCount } from '../../store/cart/cartSelector';
import './CartIcon.scss';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cartAction';

const CartIcon = () => {
  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch =useDispatch();
  const toggleIsCartOpen = () =>  dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;