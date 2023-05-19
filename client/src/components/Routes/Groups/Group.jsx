import GroupList from "./GroupsList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GroupPostForm from "./GroupPostForm";
import GroupMembership from "./Membership";
import { Card, Grid } from "semantic-ui-react";

const Group = () => {
  const { groupId } = useParams();
  const [posts, setGroupPosts] = useState([]);

  const loadPosts = () => {
    fetch(`http://localhost:8080/group/${groupId}`)
      .then((response) => response.json())
      .then((posts) => {
        setGroupPosts(posts);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onSavePost = (newPost) => {
    setGroupPosts((posts) => [...posts, newPost]);
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <GroupMembership groupId={groupId} />
      </div>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <GroupPostForm groupId={groupId} onSavePost={onSavePost} />
            <GroupList posts={posts} onSavePost={onSavePost} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Group Information</Card.Header>
                <Card.Description>
                  <p>
                    This section will contain info and join button 
                  </p>
                  <p>
                    Also a group image will go somewhere
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Group;
