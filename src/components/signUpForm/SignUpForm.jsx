import { useState } from "react";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
import './SignUpForm.scss';
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/userAction";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} =  formFields;
  const resetFormFields = () => setFormFields(defaultFormFields);

  const handelSubmit = async (event) => {
    // don't want to have any default behavior of the form
    event.preventDefault();

    if (password !== confirmPassword) return;

    try {
      // const user = await createAuthUserWithEmailAndPassword(email, password);
      // await createUserDocumentFromAuth(user, {displayName});
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code=== 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('User creation encountered an error', error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput 
          label='Display Name'
          inputProps = {{
            name:'displayName',
            type:'text',
            required: true,
            onChange:handleChange,
            value:displayName
          }}
        />
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
        <FormInput 
          label='Confirm Password'
          inputProps = {{
            name:'confirmPassword',
            type:'password',
            required: true,
            onChange:handleChange,
            value:confirmPassword
          }}
        />
        <Button 
          type="submit"
          buttonType='google'
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm;