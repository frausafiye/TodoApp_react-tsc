import React, { useRef } from "react";
import "./new-todo.css";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Loginform: React.FC = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCredentials) => {
      setCurrentUser(userCredentials.user);
      navigate("/", { replace: true });
    });
  };

  // const userLoginHandler = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const response = await requestSender("users/signin", "post", {
  //     //change method!!!
  //     body: {
  //       email: emailInputRef.current!.value,
  //       password: passwordInputRef.current!.value,
  //     },
  //     params: "",
  //   });
  //   console.log(response);
  //   if (response.success) {
  //     //user successfully logged in!
  //     console.log(response.document);
  //     setCurrentUser(response.document);
  //   } else {
  //     console.log(response.error);
  //   }
  // };
  return (
    <form
    // onSubmit={userLoginHandler}
    >
      <div className="form-control">
        <label>
          email: <input type="email" ref={emailInputRef} required />
        </label>
        <label>
          password: <input type="password" ref={passwordInputRef} required />
        </label>
      </div>
      <button type="submit">Login</button>
      <GoogleButton onClick={loginWithGoogle} />
    </form>
  );
};
export default Loginform;
