import { useState } from "react";
import Body from "./componants/Body";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./componants/auth/ErrorBoundary";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  return (
    <>
      <GoogleOAuthProvider clientId="772601863327-ph97a9alr23casq50pfeqia0n69j8pg4.apps.googleusercontent.com">
        <ErrorBoundary>
          <Body />
        </ErrorBoundary>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;