import { Link } from "react-router-dom";
import { Modal, Form, Button, Header, FormField } from "semantic-ui-react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CreateGroup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleNewGroup = (event) => {
    const group_name = event.target.value;
    setNewGroup(group_name);
  };

  const addNewGroup = () => {
    const group = {
      group_name: newGroup,
    };

    fetch(`http://localhost:8080/group`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    })
      .then((response) => response.json())
      .then((data) => {
        const createdGroup = data;
        setNewGroup(createdGroup.group_name);
        setIsSubmitted(true); // Set the submission status to true
      })
      .catch((error) => {
        console.error("Error adding group:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewGroup();
  };

  const handleModalOpen = () => {
    if (isAuthenticated) {
      setModalOpen(true);
    } else {
      alert("Must be logged in to create a group");
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setIsSubmitted(false); // resets the submission status when closing the modal
      }}
      onOpen={handleModalOpen}
      trigger={<Link> Create</Link>}
    >
      <Modal.Header className="text-center">Create Group</Modal.Header>
      <Modal.Content>
        {isSubmitted ? (
          <p>Your group has been added!</p>
        ) : (
          <>
            {isAuthenticated ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center "
              >
                <div className="flex space x-4">
                  <input
                    className=" text-md rounded-lg p-2.5 placeholder-orange-600 text-orange "
                    type="text"
                    value={newGroup}
                    required
                    placeholder="Name your group"
                    onChange={handleNewGroup}
                  />
                </div>
                <div>
                  <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" />
                    <label>I agree to the Terms and Conditions</label>
                  </div>
                </div>
                <button type="submit">Submit</button>
              </form>
            ) : (
              <p>Please log in to create a group.</p>
            )}
          </>
        )}
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default CreateGroup;
