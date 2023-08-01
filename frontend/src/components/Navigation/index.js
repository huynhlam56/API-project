import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser && Object.keys(sessionUser).length !== 0) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
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
      <ul>
        <li>
          <NavLink exact to="/">
          {/* <FontAwesomeIcon icon="fa-solid fa-house-night" /> */}
          Home
          </NavLink>
          <span className="app-name">Stay Inns</span>
        </li>
        {isLoaded && sessionLinks}
        </ul>
    </header>
  );
}

export default Navigation;
