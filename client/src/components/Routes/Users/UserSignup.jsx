import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserSignup = () => {
  const { user, isAuthenticated } = useAuth0();


//Orginal state

  const [formData, setFormData] = useState({
    displayName: "",
    pronouns: "",
    dateOfBirth: "",
    picture: "",
  });

  const handleNameChange = (event) => {
    const displayName = event.target.value;
    setFormData((formData) => ({ ...formData, displayName }));
  };

  const handlePronounsChange = (event) => {
    const pronouns = event.target.value;
    setFormData((formData) => ({ ...formData, pronouns }));
  };

  const handleDateOfBirthChange = (event) => {
    const dateOfBirth = event.target.value;
    setFormData((formData) => ({ ...formData, dateOfBirth }));
  };

  const handlePictureChange = (event) => {
    const picture = event.target.value;
    setFormData((formData) => ({ ...formData, picture }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
        //is this user logged in 
      // Handle the case where the user is not authenticated
      console.log("User is not authenticated");
      return;
    }

    const sub = user.sub;
//handles the post request to server to add user data to database if the request is successful 
    try {
      const response = await fetch(`/api/users/${sub}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
        // Handle success, e.g., show a success message or update state
      } else {
        console.error("Error updating user data:", response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <div>
        <label>Display Name:</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label >Pronouns:</label>
        <input
          type="text"
          id="pronouns"
          name="pronouns"
          value={formData.pronouns}
          onChange={handlePronounsChange}
        />
      </div>
      <div>
        <label >Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleDateOfBirthChange}
        />
      </div>
      <div>
        <label >Picture:</label>
        <input
          type="text"
          id="picture"
          name="picture"
          value={formData.picture}
          onChange={handlePictureChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserSignup;
