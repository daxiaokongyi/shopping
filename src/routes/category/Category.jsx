import { useParams } from 'react-router-dom';
import './Category.scss';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import { useSelector } from 'react-redux';
import { selectCategoryMap } from '../../store/categories/categorySelector';

const Category = () => {
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoryMap);
  const categoryTitle = category.substring(0,1).toUpperCase() + category.substring(1).toLocaleLowerCase();
  const [products, setProducts] = useState(categoriesMap[categoryTitle]);

  useEffect(() => {
    setProducts(categoriesMap[categoryTitle]);
  },[category, categoriesMap, categoryTitle]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products && products.map((product) => <ProductCard key={product.id} product={product}/>)}
      </div>
    </Fragment>
  )
}

export default Category;