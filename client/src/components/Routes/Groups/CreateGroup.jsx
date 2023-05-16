import { Link } from "react-router-dom";
import { Modal, Form, Button, Header, FormField } from "semantic-ui-react";
import { useState } from "react";

const CreateGroup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState("");

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
      body: JSON.stringify(group), // Add the body property with the JSON stringified group object
    })
      .then((response) => response.json())
      .then((data) => {
        const createdGroup = data;
        setNewGroup(createdGroup.group_name);
      })
      .catch((error) => {
        console.error("Error adding group:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewGroup();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
      trigger={<Link> Create</Link>}
    >
      <Modal.Header>Create Group</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Group Name</label>
            <input
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
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};



export default CreateGroup;
