import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GroupList = ({posts}) => {
  

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
     
      {posts && posts.map((post) => (
        <div key={post.group_post_id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
