import React, { ReactElement, useContext } from "react";
// import { Navigate } from "react-router";
import auth from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

export default function Profile(): ReactElement {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser);

  const logoutGoogle = async () => {
    await signOut(auth);
    //navigate("/",{replace:true})
    setCurrentUser(null);
  };
  return (
    <div>
      {/* <h1>currentUser</h1> */}
      <button onClick={logoutGoogle}>log out</button>
    </div>
  );
}
