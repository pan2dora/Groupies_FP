import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  //tracks loading state
  const [isLoading, setIsLoading] = useState(false);
//handles the post request to server to add users to database, if request is successful user is logged
  const addUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8080/newuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log("User added:", newUser);
        return newUser;
      } else {
        throw new Error("Error adding user: " + response.status);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      throw error;
    }
  };
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
//Checks if user is authenticated and if user is logged in, if so, user is added to database
  useEffect(() => {
    const handleUserLogin = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        const { email, given_name, picture } = user;
        console.log('User login data:', { email, given_name, picture });

        try {
          // Call the addUser function to save the new user's information
          await addUser({ email, given_name, picture });
          console.log('User added:', user);
        } catch (error) {
          console.error("Error adding user:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleUserLogin();
  }, [isAuthenticated, user]);

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