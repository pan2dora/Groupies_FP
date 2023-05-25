import React, { useState } from "react";
import { Button, Form, Input, Modal, Card, Image } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

const GroupPostForm = ({ onSavePost, groupId }) => {
  const [newPost, setNewPost] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  const handleAddPost = (event) => {
    const content = event.target.value;
    setNewPost(content);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearchGifs = (event) => {
    event.preventDefault();
    const limit = 6;

    // Perform Giphy API search request
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the GIF URLs from the API response
        const results = data.data.map((gif) => ({
          id: gif.id,
          gif: gif.images.fixed_height,
        }));

        setSearchResults(results);
      })
      .catch((error) => {
        console.error("Error searching GIFs:", error);
      });
  };

  const handleAddGif = (result) => {
    if (selectedGif === result) {
      // If the same GIF is clicked again, deselect it
      setSelectedGif(null);
    } else {
      setSelectedGif(result);
    }
  };

  const addNewPost = () => {
    const post = {
      content: newPost,
      userId: user.sub,
      image: selectedGif ? selectedGif.gif.url : null,
    };

    fetch(`/api/group/${groupId}`, {
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
      <Modal
        trigger={
          <Button onClick={handleModalOpen} fluid>
            {"What's on your mind?"}
          </Button>
        }
        open={modalOpen}
        onClose={handleModalClose}
        size="small"
      >
        <Modal.Header>Create Post</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.TextArea
              value={newPost}
              required
              placeholder="What's on your mind?"
              onChange={handleAddPost}
            />
            <Form.Field>
              <Input
                icon="search"
                placeholder="Search GIFs"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Field>
            <Button onClick={handleSearchGifs}>Search</Button>

            {searchResults.length > 0 && (
              <Card.Group itemsPerRow={4}>
                {searchResults.map((result) => (
                  <Card key={result.id}>
                    <div
                      onClick={() => handleAddGif(result)}
                      className={`gif-image ${selectedGif === result ? "selected" : ""}`}
                    >
                      <Image src={result.gif.url} alt="GIF" />
                    </div>
                  </Card>
                ))}
              </Card.Group>
            )}

            {newPost && (
              <div>
                <h3>Preview:</h3>
                <p>{newPost}</p>
                {selectedGif && (
                  <img
                    src={selectedGif.gif.url}
                    alt="GIF"
                    onClick={() => handleAddGif(selectedGif)}
                    className="selected-gif"
                  />
                )}
              </div>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button
            positive
            onClick={handleSubmit}
            disabled={!groupId || !newPost}
          >
            {groupId ? "Post" : "Not a member"}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default GroupPostForm;
