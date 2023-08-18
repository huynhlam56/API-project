import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navigation.css";
import logo from './logo.png'




function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots ? state.spots : {})


  let sessionLinks;
  if (sessionUser && Object.keys(sessionUser).length !== 0) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} spot={spot}/>
      </li>
    );

  } else {
    sessionLinks = (
      <li id='login-sign-up-buttons'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <header className="header">
    <a href='/'>
      <h1 className='logo-title' style={{color: '#bf6980'}}>
      <img style={{width: 40, height: 40, color: "#ff0099"}} src={logo}/>
      {/* <FontAwesomeIcon icon="fa-regular fa-mountain-city" size="xl" style={{color: "#45313d"}} /> */}
        Stay Inns
      </h1>
    </a>
      <ul id='home-login-singup-buttons-container'>
        {isLoaded && sessionLinks}
        </ul>
    </header>
  );
}

export default Navigation;
