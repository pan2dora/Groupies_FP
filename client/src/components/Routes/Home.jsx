import React, { useState, useEffect } from "react";
import { Card, Image, Grid, Container } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user } = useAuth0();
  const [feedData, setFeedData] = useState({ feedPosts: [], groupNames: [] });

  const sub = user?.sub;

  const loadFeedData = async () => {
    try {
      const response = await fetch(`/api/feed/${sub}`);
      const data = await response.json();
      setFeedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedData();
  }, [sub]);

  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Grid columns={2}>
        <Grid.Column width={10}>
          {feedData.feedPosts.map((post) => (
            <Card fluid key={post.group_post_id}>
              <Card.Content>
                <Image floated="left" size="mini" src={post.picture} />
                <Card.Header>{post.group_name}</Card.Header>
                <Card.Meta>{post.displayname}</Card.Meta>
               
 <Card.Description>{post.content}</Card.Description>
                <Image src={post.image} />
              </Card.Content>
              <Card.Content extra>
                <p>Like | Comment | Share</p>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <div style={{ backgroundColor: "#f9f9f9", padding: "1rem" }}>
            <h3>Groups</h3>
            {feedData.groupNames.length > 0 ? (
              <ul>
                {feedData.groupNames.map((groupName) => (
                  <li key={groupName} style={{ marginBottom: "0.5rem" }}>
                    {groupName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No groups available</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Home;

