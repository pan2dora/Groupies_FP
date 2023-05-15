import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
 
export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

//this is what exposes the session history

  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;

//this allows the React SDK to connect with the correct 
//application (the one we created earlier)
  const redirectUri = process.env.AUTH0_CALLBACK_URL;

//this is what will take users back to your react 
//application after they authenticate


const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
// this is the code that will make your application return 
//to the last page that your user was on
 
  if (!(domain && clientId && redirectUri)) {
    return null;
}

   return (
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: redirectUri,
          }}
          onRedirectCallback={onRedirectCallback}
        >
          {children}
        </Auth0Provider>
      );
     


};