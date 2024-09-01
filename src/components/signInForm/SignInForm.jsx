import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import FormInput from "../formInput/FormInput";
import Button from "../button.jsx/Button";
import './SignInForm.scss';
import { signInWithGooglePopup } from "../../utils/firebase/firebase";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } =  formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handelSubmit = async (event) => {
    // don't want to have any default behavior of the form
    event.preventDefault();

    // const {email, password, confirmPassword} = formFields;

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
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
    // switch(name) {
    //   case 'displayname':
    //     setFormFields({...formFields, [name]: value});
    //     break;
    //   case 'email':
    //     setFormFields({...formFields, [name]: value});
    //     break;
    //   case 'password':
    //     setFormFields({...formFields, [name]: value});
    //     break; 
    //   case 'confirmPassword':
    //     setFormFields({...formFields, [name]: value});
    //     break;
    //   default:
    //     break;
    // }
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