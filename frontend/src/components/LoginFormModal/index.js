import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.logInUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleLogInDemo = (e) => {
    e.preventDefault()
    const demoCred = 'demo@user.io'
    const demoPassword = 'password'

    return dispatch(sessionActions.logInUser({credential: demoCred, password: demoPassword}))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json()
      if (data && data.errors) {
        setErrors(data.errors)
      }
    })
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        {errors.credential && (
          <p className="error-message">{errors.credential}</p>
        )}
        <button className='login-button' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button id='log-in-as-user-button' onClick={handleLogInDemo}>Log in as Demo User</button>
    </>
  );
}

export default LoginFormModal;
