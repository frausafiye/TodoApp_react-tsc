import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import auth from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "./login.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Loginform: React.FC = () => {
  const { setCurrentUser } = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const userLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        //if (user !== null) {
        //const displayName = user.displayName;
        //const email = user.email;
        //const photoURL = user.photoURL;
        //const emailVerified = user.emailVerified;}
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const userSignupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await signOut(auth);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      //stay at the same page, display an error message!!!
      console.log("email is already in use, please provide another email");
    }
  };
  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCredentials) => {
      setCurrentUser(userCredentials.user);
      navigate("/", { replace: true });
    });
  };
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={isLogin ? userLoginHandler : userSignupHandler}>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button content={isLogin ? "Login" : "Sign up"} primary />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button
            content={isLogin ? "Sign up" : "Login"}
            icon="signup"
            size="big"
            onClick={() => setIsLogin((prev) => !prev)}
          />{" "}
          <div className="google-btn" onClick={loginWithGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon-svg"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google icon"
              />
            </div>
            <p className="btn-text">
              <b>Sign up with Google</b>
            </p>
          </div>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};
export default Loginform;
