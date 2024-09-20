// Action Types
import { USER_ACTION_TYPES } from "./userType";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  // email: '',
  // password: '',
  error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch(type) {
    // case USER_ACTION_TYPES.SET_CURRECT_USER: 
    // return {
    //     ...state,
    //     currentUser: payload
    // }
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload
      }
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload
      }
    // case USER_ACTION_TYPES.CHECK_USER_SESSION:
    //   return {
    //     ...state
    //   }
    // case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    //   return {
    //     ...state
    //   }
    // case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    //   return {
    //     ...state,
    //     email: payload.email,
    //     password: payload.password
    //   }
    default:
      return state;
  }
}
  
