import React from "react";
import { Card, Image, Grid, Segment, Container } from "semantic-ui-react";

const Home = () => {
  console.log("home");

  // Sample groups data (empty for now)
  const groups = [];

  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Grid columns={2}>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Image
                floated="left"
                size="mini"
                src="https://via.placeholder.com/150"
              />
              <Card.Header>John Doe</Card.Header>
              <Card.Meta>May 25, 2023</Card.Meta>
              <Card.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>Like | Comment | Share</p>
            </Card.Content>
          </Card>

          <Card fluid>
            <Card.Content>
              <Image
                floated="left"
                size="mini"
                src="https://via.placeholder.com/150"
              />
              <Card.Header>Jane Smith</Card.Header>
              <Card.Meta>May 24, 2023</Card.Meta>
              <Card.Description>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>Like | Comment | Share</p>
            </Card.Content>
          </Card>
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
