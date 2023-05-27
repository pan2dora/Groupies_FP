import React from "react";
import Home from "./components/Routes/Home";
import Explore from "./components/Routes/Explore";
import { render, fireEvent } from "@testing-library/react";

//home
//Test for rendering home component
test("renders Home component", () => {
  render(<Home />);
});


//test to see if home data renders
test("renders posts in Home component", () => {
  const mockFeedData = {
    feedPosts: [
      {
        group_post_id: 230,
        picture: "path/to/picture",
        group_name: "Group 2",
        displayname: "User 11",
        content: "Post content",
        image: "path/to/image",
      },
      {
        group_post_id: 234,
        picture: "path/to/picture",
        group_name: "Group 85",
        displayname: "User 11",
        content: "Post content",
        image: "path/to/image",
      },
    ],
    groupNames: [],
  };


});


//explore page 
test("renders Explore component with groups", () => {
  const { getByText } = render(<Explore />);

  
});