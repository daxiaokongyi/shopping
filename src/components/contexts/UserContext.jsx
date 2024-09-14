import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import { createAction } from "../../utils/firebase/reducer/reducer";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// Action Types
export const USER_ACTION_TYPES = {
  SET_CURRECT_USER: `SET_CURRENT_USER`
}

// Reducer
const userReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  const {type, payload} = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRECT_USER: 
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  // use useReducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRECT_USER, user));
  }

  // const [currentUser, setCurrentUser] = useState(null);
  const value = {currentUser, setCurrentUser};
  
  useEffect(() => {
    // set event listener below to unsubscribe used to remove it when it's unmounted
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []); 

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}

// const userReducer = (state, action) => {
//   return {
//     currentUser: null
//   }
// }
