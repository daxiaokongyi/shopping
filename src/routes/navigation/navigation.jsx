import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.scss';
import { signOutUser } from "../../utils/firebase/firebase";
import CartIcon from "../../components/cartIcon/CartIcon";
import CartDropdown from "../../components/cartDropdown/CartDropdown";
import { CartContext } from "../../components/contexts/cartContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          {currentUser 
            ? 
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
            :
            <Link className="nav-link" to='/auth'>
              SIGN IN
            </Link>
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation;