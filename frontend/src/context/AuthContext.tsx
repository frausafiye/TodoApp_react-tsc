import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

interface AuthContainerProps {
  children: ReactElement | ReactElement[];
}

export const AuthContext = createContext<any>({ currentUser: null });
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider(props: AuthContainerProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, token, setToken }}
    >
      {props.children as ReactElement}
    </AuthContext.Provider>
  );
}
