import { useDispatch } from "react-redux";
import { useState } from "react";
import * as sessionActions from '../../store/session'
import "./LoginForm.css";

function LoginFormPage() {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        dispatch(sessionActions.logInUser({ credential, password})).catch(async error => {
            const data = await error.json();
            if(data && data.errors) setErrors(data.errors)
        })
    }
    return (
        <form onSubmit={handleSubmit}>
        <label>Username or Email
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>Password
           <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type='submit'>Log In</button>
        </form>
    )
}

export default LoginFormPage
