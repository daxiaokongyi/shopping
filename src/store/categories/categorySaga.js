import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./categoryAction";
import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";

// below is an asyn function and it is a thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
  
//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray));    
//     } catch (error) {
//       dispatch(fetchCategoriesFailed(error));
//     }
//   }

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));    
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
