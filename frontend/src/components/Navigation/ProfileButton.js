import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user, spot }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const handleClickNavigateToForm = () => {
    history.push('/spots')
  }

  const handleClickNavigateToManageSpot = () => {
    history.push(`/spots/current`)
  }
  return (
    <div className="nav-bar">
      <div className="create-new-spot-button">
        <button onClick={handleClickNavigateToForm} className="new-spot-button">Create a New Spot</button>
      </div>
      <div className="open-menu-container">
      <button className='menu-button' onClick={openMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.firstName}!</li>
        <li className="user-email">{user.email}</li>
        <li>
          <button onClick={handleClickNavigateToManageSpot} className="manage-spots-button">Manage Spots</button>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  </div>
  );
}

export default ProfileButton;
