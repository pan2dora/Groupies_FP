import GroupList from "./GroupsList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GroupPostForm from "./GroupPostForm";

import { Card, Grid, Button } from "semantic-ui-react";
import { useAuth0 } from '@auth0/auth0-react';



const Group = () => {
  const { groupId } = useParams();

  const { user } = useAuth0();
  const sub = user?.sub;

  const [posts, setGroupPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);

  const loadPosts = () => {
    fetch(`/api/group/${groupId}`)
      .then((response) => response.json())
      .then((posts) => {
        setGroupPosts(posts);
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
      console.error('Error fetching membership status:', error);
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
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sub })
        });
        console.log("Test:", groupId, sub);
        console.log('Successfully left the group');
      } else {
        await fetch(`/api/group/${groupId}/join`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sub })
        });
        console.log('Successfully joined the group');
      }
      setIsMember(!isMember);
    } catch (error) {
      console.error('Error joining or leaving the group:', error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
       
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
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Group;
