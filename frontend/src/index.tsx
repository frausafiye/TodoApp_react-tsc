import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
