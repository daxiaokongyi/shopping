// import shopData from '../../shopData.json';
import { CategoriesContext } from '../../components/contexts/categoriesContext';
import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/categoryPreview/categoryPreview';

const CategoriesPreview = () => {
  const {categoriesMap} = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    </Fragment>
  );
};

export default CategoriesPreview;