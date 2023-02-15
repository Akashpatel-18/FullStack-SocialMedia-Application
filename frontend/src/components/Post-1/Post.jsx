import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "../comments/Comment";
import { Avatar } from "@mui/material";
import moment from "moment";
import "./Post.css";
import DialogUpdate from "../DialogUpdate/DialogUpdate";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likeAndUnlikePost } from "../../reducers/postSlice";


const Post = ({
  postId,
  ownerId,
  ownerName,
  avatar,
  likes,
  comments,
  caption,
  image,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.posts)
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?._id) ? (
        <div className="outerLike" style={{ fontSize: "13px" }}>
          <i className="fa-solid fa-heart" style={{ marginRight: "5px" }}></i>
          {likes.length > 2
            ? `${likes.length} likes`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div className="outerLike" style={{ fontSize: "13px" }}>
          <i className="fa-regular fa-heart" style={{ marginRight: "5px" }}></i>
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      );
    }

    return (
      <div className="outerLike" style={{ fontSize: "13px" }}>
        <i className="fa-regular fa-heart" style={{ marginRight: "5px" }}></i> like
      </div>
    );
  };

  const handleLike = () => {
    dispatch(likeAndUnlikePost(postId))
  };

  const trashHandle = () => {
    const yes = window.confirm("are you sure you want delete post ?");
    if (yes) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {avatar ? (<Avatar className="avatar" src={avatar} />) : (<Avatar className="avatar">{ownerName[0].toUpperCase()}</Avatar>) }

            <div className="details">
              <Link to={`/profile/${ownerId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{ownerName}</span>
              </Link>
              <span className="date">{moment(createdAt).fromNow()}</span>
            </div>
          </div>
          {user?._id === ownerId && (
            <i
              class="fa-solid fa-ellipsis-vertical postVertIcon"
              onClick={() => setUpdate(true)}
            ></i>
          )}
        </div>
        <div className="content">
          <p>{caption && caption}</p>
          <img src={image && image} alt="" />
        </div>
        <div className="info">
          <div className="infoInner">
            <div className="item" onClick={handleLike}>
              <Likes />
            </div>
            <div style={{display:"none"}} className="item" onClick={() => setOpen(!open)}>
              <i className="fa-regular fa-comment"></i>
              <span style={{ fontSize: "12px" }}>
                {comments.length === 0 ? "" : comments.length} comment
              </span>
            </div>
          </div>
          {user?._id === ownerId && (
            <div
              className="item"
              style={{ marginRight: "20px" }}
              onClick={trashHandle}
            >
              <i className="fa-solid fa-trash" style={{ color: "grey" }}></i>
            </div>
          )}
        </div>

        <Comment
      
          open={open}
          postId={postId}
          comments={comments}
        />
      </div>

      <DialogUpdate
        open={update}
        setOpen={setUpdate}
        postId={postId}
        caption={caption}
        image={image}
        ownerName={ownerName}
        avatar={avatar}
      />

      {/*       <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889__340.jpg"
              alt=""
            />
            <div className="details">
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">Akash Patel</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <i
            style={{ marginRight: "20px", cursor: "pointer" }}
            class="fa-solid fa-ellipsis-vertical"
          ></i>
        </div>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889__340.jpg"
            alt=""
          />
        </div>
        <div className="info">
          <div className="infoInner">
            <div className="item" onClick={() => setLiked(!liked)}>
              {liked ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
              <span style={{ fontSize: "12px" }}>12 likes</span>
            </div>
            <div className="item" onClick={() => setOpen(!open)}>
              <i class="fa-regular fa-comment"></i>
              <span style={{ fontSize: "12px" }}>12 comment</span>
            </div>
          </div>

          <div className="item" style={{ marginRight: "20px" }}>
            <i class="fa-solid fa-trash" style={{ color: "grey" }}></i>
          </div>
        </div>

        <Comment state={open} />
      </div>

      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src="https://cdn.pixabay.com/photo/2016/07/27/17/56/woman-1545885__340.jpg"
              alt=""
            />
            <div className="details">
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">Akash Patel</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <i
            style={{ marginRight: "20px", cursor: "pointer" }}
            class="fa-solid fa-ellipsis-vertical"
          ></i>
        </div>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2016/07/27/17/56/woman-1545885__340.jpg"
            alt=""
          />
        </div>
        <div className="info">
          <div className="infoInner">
            <div className="item" onClick={() => setLiked(!liked)}>
              {liked ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
              <span style={{ fontSize: "12px" }}>12 likes</span>
            </div>
            <div className="item" onClick={() => setOpen(!open)}>
              <i class="fa-regular fa-comment"></i>
              <span style={{ fontSize: "12px" }}>12 comment</span>
            </div>
          </div>

          <div className="item" style={{ marginRight: "20px" }}>
            <i class="fa-solid fa-trash" style={{ color: "grey" }}></i>
          </div>
        </div>

        <Comment state={open} />
      </div>

      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src="https://cdn.pixabay.com/photo/2021/04/03/02/21/fashion-6146328__340.jpg"
              alt=""
            />
            <div className="details">
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">Akash Patel</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <i
            style={{ marginRight: "20px", cursor: "pointer" }}
            class="fa-solid fa-ellipsis-vertical"
          ></i>
        </div>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2021/04/03/02/21/fashion-6146328__340.jpg"
            alt=""
          />
        </div>
        <div className="info">
          <div className="infoInner">
            <div className="item" onClick={() => setLiked(!liked)}>
              {liked ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
              <span style={{ fontSize: "12px" }}>12 likes</span>
            </div>
            <div className="item" onClick={() => setOpen(!open)}>
              <i class="fa-regular fa-comment"></i>
              <span style={{ fontSize: "12px" }}>12 comment</span>
            </div>
          </div>

          <div className="item" style={{ marginRight: "20px" }}>
            <i class="fa-solid fa-trash" style={{ color: "grey" }}></i>
          </div>
        </div>

        <Comment state={open} />
      </div> */}
    </>
  );
};

export default Post;
