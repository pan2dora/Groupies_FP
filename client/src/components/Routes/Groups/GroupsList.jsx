import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const GroupList = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div className="flex flex-col bg-white border border-gray-300 rounded-lg p-4 mb-4" key={post.group_post_id}>
            <div className="flex items-center mb-2">
              <img className="w-8 h-8 rounded-full mr-2" src={post.image} alt="post image" />
              <p className="font-semibold">{post.author}</p>
            </div>
            <p className="mb-4">{post.content}</p>
            <button className="flex items-center text-orange-500 font-semibold">
              Like
            </button>
          </div>
        ))}
    </div>
  );
};



export default GroupList;
