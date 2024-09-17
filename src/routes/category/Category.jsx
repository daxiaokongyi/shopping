import { useParams } from 'react-router-dom';
import './Category.scss';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categorySelector';
import Spinner from '../../components/spinner/spinner';

const Category = () => {
  const {category} = useParams();
  console.log(`render/re-rendering category component`);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categoryTitle = category;
  const [products, setProducts] = useState(categoriesMap[categoryTitle]);

  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[categoryTitle]);
  },[category, categoriesMap, categoryTitle]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      {isLoading 
        ? (
        <Spinner />
      )
        :
        <div className='category-container'>
          {products && products.map((product) => <ProductCard key={product.id} product={product}/>)}
        </div>
      }
    </Fragment>
  )
}

export default Category;