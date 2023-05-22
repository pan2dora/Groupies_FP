import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal, Button, Form } from "semantic-ui-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName:  "",
    pronouns: "",
    dateOfBirth: "",
    picture: "",
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch request to update user data goes here
    // Replace `YOUR_API_ENDPOINT` with your actual API endpoint
    const sub = user.sub;
    try {
      const response = await fetch(`http://localhost:8080/users/${sub}`, {
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
    setEditMode(false);
  };

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        {!editMode && (
          <div>
            <p>{user.displayName}</p>
            <Button onClick={handleEditClick}>Edit</Button>
          </div>
        )}
        {editMode && (
          <Modal open={true} onClose={handleCancelClick}>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleFormChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Pronouns</label>
                  <input
                    type="text"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleFormChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleFormChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Picture</label>
                  <input
                    type="text"
                    name="picture"
                    value={formData.picture}
                    onChange={handleFormChange}
                  />
                </Form.Field>
                <Button type="submit">Save</Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
              </Form>
            </Modal.Content>
          </Modal>
        )}
      </div>
    )
  );
};

export default Profile;
