import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "semantic-ui-react";

const ProfileLogo = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const addUser = async (userData) => {
    try {
      const response = await fetch("/api/newuser", {
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

  const checkUserExists = async (sub) => {
    try {
      const response = await fetch("/api/checkuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sub }),
      });

      if (response.ok) {
        const userExists = await response.json();
        return userExists;
      } else {
        throw new Error("Error checking user: " + response.status);
      }
    } catch (error) {
      console.error("Error checking user:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    console.log({ isAuthenticated, user });
    const handleUserLogin = async () => {
      if (isAuthenticated && user) {
        const { email, given_name, picture, sub } = user;
        console.log("User login data:", { email, given_name, picture, sub });

        try {
          const userExists = await checkUserExists(sub);

          if (userExists) {
            console.log("User already exists:", user);
            // Do something with existing user if needed
          } else {
            await addUser({ email, given_name, picture, sub });
            console.log("User added:", user);

            // Navigate to the signup page after adding the user
            navigate("/signup"); // Replace "/signup" with the desired signup page path
          }
        } catch (error) {
          console.error("Error checking user:", error.message);
        }
      }
    };

    handleUserLogin();
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      {!user ? null : (
        <div>
          <a href="/profile">
            <Image
             avatar
              className="rounded-full center"
              alt="user-image"
              src={user.picture}
            />
          </a>
        </div>
      )}
    </>
  );
};

export default ProfileLogo;