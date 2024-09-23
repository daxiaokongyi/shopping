import { useState } from "react";
// import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
import './SignInForm.scss';
// import { signInWithGooglePopup } from "../../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/userAction";
// import { USER_ACTION_TYPES } from "../../store/user/userType";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } =  formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  }

  const handelSubmit = async (event) => {
    // don't want to have any default behavior of the form
    event.preventDefault();

    try {
      // await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log(error);
      const {code}=error;
      switch(code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput 
          label='Email'
          inputProps = {{
            name:'email',
            type:'email',
            required: true,
            onChange:handleChange,
            value:email
          }}
        />
        <FormInput 
          label='Password'
          inputProps = {{
            name:'password',
            type:'password',
            required: true,
            onChange:handleChange,
            value:password
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;