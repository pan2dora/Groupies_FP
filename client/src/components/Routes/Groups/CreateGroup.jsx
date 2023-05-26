import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Header } from 'semantic-ui-react';
import { useAuth0 } from '@auth0/auth0-react';

const CreateGroup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGroupCreated, setIsGroupCreated] = useState(false);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const handleNewGroup = (event) => {
    const group_name = event.target.value;
    setNewGroup(group_name);
  };

  const handleNewGroupDescription = (event) => {
    const description = event.target.value;
    setNewGroupDescription(description);
  };

  const addNewGroup = () => {
    const group = {
      group_name: newGroup,
      description: newGroupDescription,
      sub: user.sub
    };

    fetch('/api/group', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group),
    })
      .then((response) => response.json())
      .then((data) => {
        const createdGroup = data;
        setNewGroup(createdGroup.group_name);
        setNewGroupDescription(createdGroup.description); // Update this line
        setIsSubmitted(true); // Set the submission status to true
        setIsGroupCreated(true); // Set the group creation status to true
      })
      .catch((error) => {
        console.error('Error adding group:', error);
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
      alert('Must be logged in to create a group');
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setIsSubmitted(false); // Reset the submission status when closing the modal
        setIsGroupCreated(false); // Reset the group creation status when closing the modal
      }}
      onOpen={handleModalOpen}
      trigger={<Link> Create</Link>}
    >
      <Modal.Header className="text-center">Create Group</Modal.Header>
      <Modal.Content>
        {isGroupCreated ? (
          <p>Your group has been created!</p>
        ) : (
          <>
            {isAuthenticated ? (
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Name your group</label>
                  <input
                    type="text"
                    value={newGroup}
                    required
                    placeholder="Group Name"
                    onChange={handleNewGroup}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Describe your group</label>
                  <textarea
                    value={newGroupDescription}
                    required
                    placeholder="Group Description"
                    onChange={handleNewGroupDescription}
                  />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
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
