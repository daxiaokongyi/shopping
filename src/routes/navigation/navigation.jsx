import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.css';
import { UserContext } from "../../components/userContext/UserContext";
import { signOutUser } from "../../utils/firebase/firebase";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  
  // const handleSignOut =  async () => {
  //   const res = await signOutUser();
  //   // setCurrentUser(res); // useAuthStaged... will be called 
  // }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            Shop
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
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation;