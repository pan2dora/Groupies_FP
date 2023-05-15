import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GroupList = () => {
  const { groupId } = useParams();
  const [posts, setGroupPosts] = useState([]);




const loadPosts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        
        
        
        fetch(`http://localhost:8080/group/${groupId}`)
            .then((response) => response.json())
            .then((posts) => {
                setGroupPosts(posts);
            });
    }

    useEffect(() => {
        loadPosts();
    }, []);
  
 console.log(posts, "This is data ")
  

  return (
    <>
      <h1>Group Posts</h1>
      {posts.map((post) => (
        <div key={post.group_post_id}>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
};

export default GroupList;
