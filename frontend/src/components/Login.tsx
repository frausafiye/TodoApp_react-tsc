import React, { ReactElement, useState, useRef } from "react";
import SignUp from "./SignUp";

interface Props {
  setUser: Function;
}

export default function Login({ setUser }: Props): ReactElement {
  const [login, setLogin] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const fetchUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      const enteredEmail = emailInputRef.current!.value;
      const enteredPassword = passwordInputRef.current!.value;

      //check userAuthentication sending a req
      //setLoggedIn(true)
    } else {
      //please enter an email and password!
      console.log("please enter an email and password!");
    }
  };
  return (
    <div>
      {!login && (
        <div className="login-button-container">
          <button className="login-button" onClick={() => setLogin(true)}>
            Login
          </button>
          <button onClick={() => setSignup(true)} className="login-button">
            Sign Up
          </button>
        </div>
      )}
      {login && (
        <div>
          <form className="form-control" onSubmit={fetchUser}>
            <label>
              email:
              <input type="email" ref={emailInputRef} />
            </label>

            <label>
              password: <input type="password" ref={passwordInputRef} />
            </label>

            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {loggedIn && (
        <button
          onClick={() => {
            setLoggedIn(false);
            setLogin(false);
          }}
        >
          Logout
        </button>
      )}
      {signup && <SignUp setUser={setUser} />}
    </div>
  );
}
