import React, { useState, useEffect } from "react";
import { Card, Image, Grid, Container, Button } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import GroupPostForm from "./GroupPostForm";

const Group = () => {
  const { groupId } = useParams();

  const { user } = useAuth0();
  const sub = user?.sub;

  const [posts, setGroupPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);

  const loadPosts = () => {
    fetch(`/api/group/${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched posts:", data);
        setGroupPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  
  useEffect(() => {
    loadPosts();
  }, []);
  

 

  const fetchMembershipStatus = async () => {
    try {
      const response = await fetch(`/api/membership/${groupId}/${sub}`);
      const data = await response.json();
      setIsMember(data.isMember);
      console.log("membership data from client", data);
    } catch (error) {
      console.error("Error fetching membership status:", error);
    }
  };

  useEffect(() => {
    if (user === null) {
      return;
    }
    fetchMembershipStatus();
  }, [user]);

  const onSavePost = (newPost) => {
    setGroupPosts((posts) => [...posts, newPost]);
  };

  const handleJoinOrLeaveGroup = async () => {
    try {
      if (isMember) {
        await fetch(`/api/group/${groupId}/leave`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sub }),
        });
        console.log("Test:", groupId, sub);
        console.log("Successfully left the group");
      } else {
        await fetch(`/api/group/${groupId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sub }),
        });
        console.log("Successfully joined the group");
      }
      setIsMember(!isMember);
    } catch (error) {
      console.error("Error joining or leaving the group:", error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}></div>
      <Container style={{ paddingTop: "1rem" }}>
        <Grid columns={2} stackable>
          <Grid.Column width={10}>
            <GroupPostForm groupId={groupId} onSavePost={onSavePost} />
            {posts && posts.map((post) => (
              <Card fluid key={post.group_post_id}>
                <Card.Content>
                  <Image floated="left" size="mini" src={post.picture} />
                  <Card.Meta>{post.displayname}</Card.Meta>
                  <Card.Description>{post.content}</Card.Description>
                  {post.image && <Image src={post.image} />}
                </Card.Content>
                <Card.Content extra>
                  <p>Like | Comment | Share</p>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
          <Grid.Column width={6}>
            <Card fluid>
              <Card.Content>
                <Card.Description>
                  <div>
                    <Button onClick={handleJoinOrLeaveGroup}>
                      {isMember ? "Leave Group" : "Join Group"}
                    </Button>
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default Group;
