import { Fragment } from 'react';
import CategoryPreview from '../../components/categoryPreview/categoryPreview';
import { useSelector } from 'react-redux';
import { selectCategoryMap } from '../../store/categories/categorySelector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoryMap);
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