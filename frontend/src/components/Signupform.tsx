import React, { useContext, useRef } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import "./new-todo.css";
import { requestSender } from "./requestSender";

const SignUp: React.FC = () => {
  const { currentUser, setCurrentUser, register } = useContext(AuthContext);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const userSignupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    register(email, password);
    // const response = await requestSender("users/signup", "post", {
    //   body: {
    //     email: emailInputRef.current!.value,
    //     password: passwordInputRef.current!.value,
    //   },
    //   params: "",
    // });
    // console.log(response); //undefined!
    // if (response.success) {
    //   //user successfully signed up!
    //   console.log(response.document);
    //   setCurrentUser(response.document);
    // } else {
    //   console.log(response.error);
    // }
  };
  return (
    <form onSubmit={userSignupHandler}>
      <div className="form-control">
        <label>
          email: <input type="email" ref={emailInputRef} required />
        </label>
        <label>
          password: <input type="password" ref={passwordInputRef} required />
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
export default SignUp;
