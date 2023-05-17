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
      userId: user.sub, //user.sub is the Auth0 id and we include it with the API request so we can register who is posting in groups
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
    if(isAuthenticated && groupId){ //if user is logged in and a member of the group they cab post
    addNewPost();}
  };

  return (
    <div>
      {isAuthenticated && groupId ? ( //another authentication check to make sure the user is logged in and a member of the group
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
