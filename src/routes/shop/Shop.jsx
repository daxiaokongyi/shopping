import './Shop.scss';
import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categoriesPreview/categoriesPreview';
import Category from '../category/Category';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';
import { useDispatch } from 'react-redux';
// import { setCategories } from '../../store/categories/categoryAction';
import { fetchCategoriesAsync } from '../../store/categories/categoryAction';


const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const getCategoriesMap = async () => {
      // const categoriesArray = await getCategoriesAndDocuments('categories');
      // dispatch(setCategories(categoriesArray));
      // dispatch(fetchCategoriesAsync);
      dispatch(fetchCategoriesAsync());
    }
    // getCategoriesMap();
  , []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  )
}

export default Shop;