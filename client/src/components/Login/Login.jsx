import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const addUser = async (newUser, setUser) => {
  const { email, family_name, picture } = newUser;

  const userObj = {
    email: email,
    family_name: family_name,
    picture: picture,
  };

  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
      console.log(user);
    } else {
      console.error("Error adding user:", response.status);
    }
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user: newUser, setUser } =
    useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  useEffect(() => {
    if (newUser) {
      addUser(newUser, setUser);
    }
  }, [newUser, setUser]);

 // console.log(newUser);

  return (
    <button
      className="text-small bg-white-600 text-black fw-20 rounded md:ml-9 hover:bg-orange-100 duration-500"
      onClick={handleLogin}
    >
      Log In
    </button>
  );
};

export default LoginButton;