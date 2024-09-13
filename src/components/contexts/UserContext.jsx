import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../../utils/firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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