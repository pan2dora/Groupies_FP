import { useAuth0 } from "@auth0/auth0-react";


export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
        //later navigate to page to edit profile
      }
  };
};