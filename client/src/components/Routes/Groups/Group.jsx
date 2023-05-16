import GroupList from "./GroupsList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GroupPostForm from "./GroupPostForm";
const Group = () => {
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
    


    return(
    <>
    <div >
   <GroupPostForm/>
    </div>
   <div >
    
    {groupId && <GroupList posts = {posts}/>}
   
    </div></>
)

}

export default Group;