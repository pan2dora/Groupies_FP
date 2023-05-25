import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  //tracks loading state
  const [isLoading, setIsLoading] = useState(false);
//handles the post request to server to add users to database, if request is successful user is logged

//handles button click to login
  const handleLogin = async () => {
    setIsLoading(true);

    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      // prompt: "select_account",
    });
  };
  

  return (
    <button
      className="text-small bg-white-600 text-black fw-20 rounded md:ml-9 hover:bg-orange-100 duration-500"
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? "Logging In..." : "Log In"}
    </button>
  );
};

export default LoginButton;