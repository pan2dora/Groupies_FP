import { useAuth0 } from "@auth0/auth0-react";


const LogoutButton = () => {
  const { logout } = useAuth0();
  
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
       
      },
    });
  };
  
  return (
    <button className=' bg-white-600 text-black fw-20 rounded md:ml-9 hover:bg-orange-100 duration-500' onClick={handleLogout}>
      Log Out
    </button>
  );
};
export default LogoutButton;