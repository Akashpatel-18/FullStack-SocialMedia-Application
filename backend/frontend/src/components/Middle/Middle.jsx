import React from "react";
import Post from "../Post-1/Post";
import "./Middle.css";
import Feed from "../Feed/Feed";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Middle = () => {
  const { posts } = useSelector((state) => state.posts);
 

  return (
    <div className="middle">
      <Feed />

      {!posts?.length ? (
        <CircularProgress />
      ) : (
        posts
          .map((post) => (
            <Post
              key={post?._id}
              ownerId={post?.owner._id}
              ownerName={post?.owner.name}
              avatar={post?.owner.avatar}
              postId={post?._id}
              caption={post?.caption}
              image={post?.image}
              createdAt={post?.createdAt}
              likes={post?.likes}
              comments={post?.comments}
            />
          ))
          .reverse()
      )}
    </div>
  );
};

export default Middle;
