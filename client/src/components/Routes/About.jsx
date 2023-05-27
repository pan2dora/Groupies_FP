import { Container, Header, Icon  } from "semantic-ui-react";

const About = () => {

return(
    <Container textAlign="center" style={{ marginTop: "5rem" }}>
    <Header as="h1" size="huge">
      Welcome to Groupies!
    </Header>
    <p style={{ fontSize: "1.5rem" }}>
      Groupies is a platform for connecting with like-minded individuals and
      exploring shared interests through groups.
    </p>
    <p style={{ fontSize: "1.5rem" }}>
      Join various groups, engage in discussions, and share your experiences
      with the community.
    </p>
    <p style={{ fontSize: "1.5rem" }}>
      Get started by signing up and joining your favorite groups!
    </p>
    <div>
      <Icon
        name="github"
        size="big"
        link
        onClick={() => window.open("https://github.com/your-github-profile", "_blank")}
      />
      <Icon
        name="linkedin"
        size="big"
        link
        onClick={() => window.open("https://www.linkedin.com/in/your-linkedin-profile", "_blank")}
      />
    </div>
  </Container>

);


}

export default About;