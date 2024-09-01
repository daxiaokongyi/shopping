// import { useEffect } from "react";
// import {getRedirectResult} from 'firebase/auth';
import SignUpForm from "../../components/signUpForm/SignUpForm";
import SignInForm from "../../components/signInForm/SignInForm";
import './authentication.scss'

const Authentication = () => {
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

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;