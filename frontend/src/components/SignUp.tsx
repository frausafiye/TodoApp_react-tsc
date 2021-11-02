import React, { useRef } from "react";
import "./new-todo.css";
import { requestSender } from "./requestSender";

interface SignupProps {
  setUser: Function;
}

const SignUp: React.FC<SignupProps> = (props) => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userSignupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(firstNameInputRef.current!.value);
    const response = await requestSender("users", "post", {
      body: {
        firstName: firstNameInputRef.current!.value,
        lastName: lastNameInputRef.current!.value,
        userName: userNameInputRef.current!.value,
        email: emailInputRef.current!.value,
        password: passwordInputRef.current!.value,
      },
      params: "",
    });
    if (response.success) {
      props.setUser(response.document);
    } else {
      console.log(response.error);
    }
  };
  return (
    <form onSubmit={userSignupHandler}>
      <div className="form-control">
        <label></label>
        <input type="text" ref={firstNameInputRef} required />
        <input type="text" ref={lastNameInputRef} required />
        <input type="text" ref={userNameInputRef} required />
        <input type="email" ref={emailInputRef} required />
        <input type="password" ref={passwordInputRef} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
export default SignUp;
