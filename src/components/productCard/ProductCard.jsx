import './productCard.scss'
import Button from '../button.jsx/Button';
import { CartContext } from '../contexts/cartContext';
import { useContext } from 'react';

const ProductCard = ({product}) => {
  const {name, imageUrl, price} = product;
  const {adddItemToCart} = useContext(CartContext);
  const addProductToCart = () => adddItemToCart(product);

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