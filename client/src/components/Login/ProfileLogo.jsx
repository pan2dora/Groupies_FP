
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";


const ProfileLogo = () => {
    const {user,isAuthenticated} = useAuth0();

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

      //Checks if user is authenticated and if user is logged in, if so, user is added to database

      useEffect(() => {
        console.log({isAuthenticated,user})
        const handleUserLogin = async () => {
          if (isAuthenticated && user) {
           
            const { email, given_name, picture, sub} = user;
            console.log('User login data:', { email, given_name, picture, sub });
           
            try {
              // Call the addUser function to save the new user's information
              await addUser({ email, given_name, picture, sub });
              console.log('User added:', user);
            } catch (error) {
              console.error("Error adding user:", error.message);
            } 
          }
        };
    
        handleUserLogin();
      }, [isAuthenticated, user]);


   
return (
    <>
    {!user ? null : (
        <div>
          <a href="/profile">
            <img
              className="rounded-full center"
              alt="user-image"
              src={user.picture}
            />
          </a>
        </div>
      )}
 

</>)}

export default ProfileLogo;