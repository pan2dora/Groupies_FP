import { useAuth0 } from "@auth0/auth0-react";


export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
        //later navigate to page to edit profile
    },
    // using and defining this property means that this 
    //object will be sent as a query to the auth0 endpoint 
    //letting it know that we wwant the sign up page
          authorizationParams: {
            screen_hint: "signup",
          },
        });
      };
    }