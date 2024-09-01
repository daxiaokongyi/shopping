// import { useEffect } from "react";
// import {getRedirectResult} from 'firebase/auth';

import { 
  // auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  // signInWithGoogleRedirect
} from "../../utils/firebase/firebase";
import SignUpForm from "../../components/signUpForm/SignUpForm";

const SignIn = () => {
  // useEffect(() => {
  //   const helper = async () => {
  //     try {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         console.log(response);
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       } else {
  //         console.log(`no response`);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   helper();
  // }, [])

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm/>
    </div>
  )
}

export default SignIn;