import React, { useState, useEffect } from "react";
import { Card, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/groups");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Card.Group>
        {groups.map((group) => (
          <Card key={group.group_name} as={Link} to={`/group/${group.group_table_id}`}>
            <Card.Content>
              <Card.Header>{group.group_name}</Card.Header>
              <Card.Description>{group.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default Explore;

