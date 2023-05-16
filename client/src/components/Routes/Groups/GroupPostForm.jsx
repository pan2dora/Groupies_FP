import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

const GroupPostForm = ({ onSavePost, groupId }) => {
  const [newPost, setNewPost] = useState("");

  const handleAddPost = (event) => {
    const content = event.target.value;
    setNewPost(content);
  };

  const addNewPost = () => {
    const post = {
      content: newPost,
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
    addNewPost();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newPost}
          required
          placeholder="What's on your mind?"
          onChange={handleAddPost}
        />
        <Button type="submit" disabled={!groupId}>
          {groupId ? "Post" : "Not a member"}
        </Button>
      </Form>
    </div>
  );
};

export default GroupPostForm;
