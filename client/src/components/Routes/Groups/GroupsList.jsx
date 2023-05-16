import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GroupList = ({posts}) => {
  

  

  return (
<div >     
      {posts && posts.map((post) => (
        <div className="w-96 bg-base-100 shadow-xl text-center " key={post.group_post_id}>
              <img className='items-center' src={post.image} alt="post image"/>
          <p >{post.content}</p>
          <button className="btn btn-primary">Like</button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
