import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GroupList = ({posts}) => {
  

  return (
<div >     
      {posts && posts.map((post) => (
        <div className="card w-96 bg-base-100 shadow-xl" key={post.group_post_id}>
              <img src={post.image} alt="post image"/>
          <p className="card-actions justify-end">{post.content}</p>
          <button className="btn btn-primary">Like</button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
