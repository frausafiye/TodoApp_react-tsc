import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import auth from "../config/firebase-config";
import "./navbar.css";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const logoutGoogle = async () => {
    await signOut(auth);
    //navigate("/",{replace:true})
    setCurrentUser(null);
  };
  return (
    <div className="navbar">
      <nav>
        <ul style={{ display: "flex" }}>
          {currentUser ? (
            <li>
              <button onClick={logoutGoogle}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button>Login </button>
                </Link>
              </li>
              <li className="right-side">
                <Link to="/signup">
                  <button>Sign up </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
