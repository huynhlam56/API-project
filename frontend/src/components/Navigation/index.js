import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
      <img style={{width: 40, height: 40}} src={logo}/>
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
