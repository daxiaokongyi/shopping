// import shopData from '../../shopData.json';
import { ProductsContext } from '../../components/contexts/productsContext';
import { useContext } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import './Shop.scss';

const Shop = () => {
  const {products} = useContext(ProductsContext);

  return (
    <div className='product-container'>
      {products && products.map((product) => {
        return (
          <ProductCard key={product.id} product={product} ></ProductCard>
        )
      })}
    </div>
  )
}

export default Shop;