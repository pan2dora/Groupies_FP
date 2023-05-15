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
        <button className = ' text-small bg-white-600 text-black fw-20 rounded md:ml-9 hover:bg-orange-100 duration-500' onClick={handleLogin}>
          Log In
        </button>
    )

};

export default LoginButton;