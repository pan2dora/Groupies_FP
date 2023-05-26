import React, { useState, useEffect } from "react";
import { Grid, Card, Image } from "semantic-ui-react";





const GroupList = ({ posts }) => {
  return (
    <Grid.Column width={6}>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <Card fluid key={post.group_post_id}>
            <Card.Content>
              <Image floated="left" size="mini" src={post.picture} />
              <Card.Meta>{post.displayname}</Card.Meta>
              <Card.Meta>({post.pronouns})</Card.Meta>
              <Card.Description>{post.content}</Card.Description>
              <Image src={post.image} />
            </Card.Content>
            <Card.Content extra>
              <p>Like | Comment | Share</p>
            </Card.Content>
          </Card>
        ))}
    </Grid.Column>
  );
};

export default GroupList;


  
  
  
  