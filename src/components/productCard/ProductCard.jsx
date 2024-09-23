import './productCard.scss'
import Button from '../button/Button';
import { adddItemToCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';
import { useDispatch, useSelector } from 'react-redux';

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const {name, imageUrl, price} = product;
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(adddItemToCart(cartItems, product));

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button 
        buttonType='inverted'
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default ProductCard;