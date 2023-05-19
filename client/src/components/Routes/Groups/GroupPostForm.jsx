import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

const GroupPostForm = ({ onSavePost, groupId }) => {
  const [newPost, setNewPost] = useState("");
  const { isAuthenticated, user } = useAuth0();

  const handleAddPost = (event) => {
    const content = event.target.value;
    setNewPost(content);
  };

  const addNewPost = () => {
    const post = {
      content: newPost,
      userId: user.sub,
    };

    fetch(`http://localhost:8080/group/${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        onSavePost(data);
        setNewPost("");
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated && groupId) {
      addNewPost();
    }
  };

  return (
    <div>
      {isAuthenticated && groupId ? (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              type="text"
              value={newPost}
              required
              placeholder="What's on your mind?"
              onChange={handleAddPost}
            />
          </Form.Field>
          <Button type="submit" disabled={!groupId}>
            {groupId ? "Post" : "Not a member"}
          </Button>
        </Form>
      ) : (
        <div>
          {!isAuthenticated ? (
            <p>Please log in to add a post.</p>
          ) : (
            <p>You are not a member of this group.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupPostForm;

