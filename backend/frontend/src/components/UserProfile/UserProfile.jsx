import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Leftbar from "../Leftbar/Leftbar";
import Rightbar from "../Rightbar/Rightbar";
import Post from "../Post-1/Post";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ScrollButton from "../ScrollButton/ScrollButton";
import { Avatar } from "@mui/material";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUserPost, otherUser } from "../../reducers/postSlice";
import EditProfile from "../EditProfile/EditProfile";
import {toast} from 'react-toastify'
import {logOut} from '../../reducers/authSlice'

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    user && dispatch(otherUser(id));
    user && dispatch(getOtherUserPost(id));
  }, [user, dispatch, id]);

  const { bijoUser } = useSelector((state) => state.posts);
  const { otherPosts } = useSelector((state) => state.posts);
  const { user: loginUser } = useSelector((state) => state.posts);

  const handleLogout = () => {
    if(window.confirm("Are You Sure You Want to Logout ?")){
      dispatch(logOut({navigate, toast}))
    }
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <Leftbar />
        <div className="profile">
          {bijoUser && (
            <>
              <div className="profileBox">
                <div className="profileLeft">
                  {bijoUser?.avatar ? (
                    <Avatar className="profileAvatar" src={bijoUser?.avatar} />
                  ) : (
                    <Avatar className="profileAvatar">
                      {bijoUser?.name[0].toUpperCase()}
                    </Avatar>
                  )}
                </div>
                <div className="profileRight">
                  <span className="profileTop">{bijoUser?.name}</span>
                  {loginUser._id === bijoUser._id && (
                    <div className="profileMiddle">
                      <span
                        className="editProfile1"
                        onClick={() => setOpen(true)}
                      >
                        Edit profile
                      </span>
                      <span className="logout" onClick={handleLogout}>Logout</span>
                    </div>
                  )}
                  <span className="profileBottom">
                    {otherPosts?.length === 0
                      ? "No Post Yet"
                      : otherPosts?.length === 1
                      ? `${otherPosts?.length} Post`
                      : `${otherPosts?.length} Posts`}
                  </span>
                </div>
              </div>

              {!otherPosts.length ? (
                <CircularProgress />
              ) : (
                otherPosts
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
            </>
          )}

          <EditProfile open={open} setOpen={setOpen} />
        </div>

        <Rightbar />
      </div>

      <ScrollButton />
    </>
  );
};

export default UserProfile;
