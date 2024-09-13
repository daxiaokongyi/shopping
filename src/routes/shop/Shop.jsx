// import shopData from '../../shopData.json';
import './Shop.scss';
import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categoriesPreview/categoriesPreview';
import Category from '../category/Category';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  )
}

export default Shop;