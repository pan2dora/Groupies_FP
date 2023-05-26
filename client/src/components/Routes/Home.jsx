import React from "react";
import { Card, Image, Grid, Segment, Container } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
const Home = () => {
  console.log("home");

  // Sample groups data (empty for now)
  //const groups = [];

  const { user } = useAuth0();
  const [feedPosts, setFeedPosts] = useState([]);

  const sub = user?.sub;

  const loadFeedPosts = async () => {
    try {
      const response = await fetch(`/api/feed/${sub}`);
      const data = await response.json();
      setFeedPosts(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadFeedPosts();
  },[sub]);

  console.log("feedPosts", feedPosts);

  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Grid columns={2}>
        <Grid.Column width={10}>
          {
            feedPosts.map((post) => (
              <Card fluid key={post.group_post_id}>
                <Card.Content>
                  <Image floated="left" size="mini" src={post.picture} />
                  <Card.Header>{post.group_name}</Card.Header>
                  <Card.Meta>{post.displayname}</Card.Meta>
                  <Card.Description>{post.content}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <p>Like | Comment | Share</p>
                </Card.Content>
              </Card>
            ))}
        </Grid.Column>

        <Grid.Column width={6}>
          {/* <Segment>
            <h3>Groups</h3>
            {groups.length > 0 ? (
              <ul>
                {groups.map((group) => (
                  <li key={group.id}>{group.name}</li>
                ))}
              </ul>
            ) : (
              <p>No groups available</p>
            )}
          </Segment> */}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Home;
