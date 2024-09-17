import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";

// initial state of reducer
const INITIAL_STATE = {
  categories: []
}

export const categoriesReducer = (state = INITIAL_STATE, action={}) => {
  // Reducer is combined with state and action which has type and payload
  const {type, payload} = action;

  switch(type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    default: 
      return state; 
  }
}