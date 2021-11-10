import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
// import { getAuth } from '@firebase/auth'
import auth from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface AuthContainerProps {
  children: ReactElement | ReactElement[];
}

export const AuthContext = createContext<any>({ currentUser: null });
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider(props: AuthContainerProps) {
  console.log(useAuth());
  const [currentUser, setCurrentUser] = useState(null);
  function register(email: string, password: string): Promise<any> {
    //??? I need type here!!1
    return createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, register }}>
      {props.children as ReactElement}
    </AuthContext.Provider>
  );
}
