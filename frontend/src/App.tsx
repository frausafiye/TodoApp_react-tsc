import React, { useContext } from "react";
import Loginform from "./components/Loginform";
import AuthContextProvider, {
  AuthContext,
  useAuth,
} from "./context/AuthContext";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignUpform from "./components/Signupform";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Todos />
              </>
            }
          />
          <Route path="/login" element={<Loginform />} />
          <Route path="/signup" element={<SignUpform />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
