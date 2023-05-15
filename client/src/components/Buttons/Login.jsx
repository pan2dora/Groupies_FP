import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
 
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    // loginwithredirect connects to an endpoint that starts
    //the authentication process
      const handleLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/",
    // takes users to the profile page
          },
        });


    }

    return (
        <button className="button__login" onClick={handleLogin}>
          Log In
        </button>
    )

};

export default LoginButton;