import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
 
export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    // loginwithredirect connects to an endpoint that starts
    //the authentication process
      const handleLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/profile",
    // takes users to the profile page
          },
        });



};