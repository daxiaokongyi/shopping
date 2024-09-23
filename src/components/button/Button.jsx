import './Button.scss';
/*
default

invented

google sign in

*/

import { SpinnerContainer } from '../spinner/spinnerStyles';

export const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({children, buttonType, isLoading, ...otherProps}) => {
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      disabled={isLoading}
      {...otherProps}
    >
      {/* {isLoading ? <SpinnerContainer/> : children} */}
      {isLoading ? <SpinnerContainer style={{width: '30px', height: '30px'}}/> : children}
    </button>
  )
}

export default Button;