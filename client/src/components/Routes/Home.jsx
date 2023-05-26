
import { Card, Image, Grid, Segment, Container } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
 

  // Sample groups data (empty for now)
  const groups = [];


  const { user } = useAuth0();
  const sub = user?.sub;
  let query = `/api/feed/${sub}`

  const [feedPosts, setFeedPosts] = useState([])

  const loadFeedPosts = () => {
    fetch(query)
  
  .then((response) => response.json())
  .then((feedPosts) => {
    setFeedPosts(feedPosts);
  })
  .catch((error) => {
    console.log(error);
  })
};


useEffect(() => {
loadFeedPosts();
}, [feedPosts]);


const LoadGroupLinks = () => {
  fetch(`/api/feed/${sub}`)
  .then((response) => response.json())
}



return (
  <Container style={{ paddingTop: "1rem" }}>
    <Grid columns={2}>
      <Grid.Column width={10}>
       {feedPosts.map((post) => (
          <Card fluid key={post.group_post_id}>
           
            <Card.Content>
              
            <div style={{ display: 'flex', alignItems: 'center' }}>
  <Image src={post.picture} avatar />
  <Card.Header>{post.displayname}</Card.Header>
</div>
            <Card.Description>{post.content}</Card.Description>
              {post.image && (
                <Image size="large" centered src={post.image} />
              )}
              
              <Card.Meta>{post.date}</Card.Meta>
            
            </Card.Content>
            <Card.Content extra>
              <p>Like | Comment | Share</p>
            </Card.Content>
          </Card>
        ))}
      </Grid.Column>

      <Grid.Column width={6}>
        <Segment>
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
        </Segment>
      </Grid.Column>
    </Grid>
  </Container>
);
};

export default Home;