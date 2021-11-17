import React, { useContext, useEffect } from "react";
import Loginform from "./components/Loginform";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import auth from "./config/firebase-config";
import { HashRouter, Routes, Route } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

const App: React.FC = () => {
  const { currentUser, setCurrentUser, setToken } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (returnUser) => {
      if (returnUser) {
        // User is signed in
        // const uid = returnUser.uid;
        if (!currentUser) {
          setCurrentUser(returnUser);
        }
        returnUser.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                {currentUser && <Todos />}
              </>
            }
          />
          <Route path="/login" element={<Loginform />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
