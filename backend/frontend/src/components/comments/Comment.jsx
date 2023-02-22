import React from "react";
import { Avatar } from "@mui/material";
import moment from "moment";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./Comment.css";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { commentPost } from "../../reducers/postSlice";

const Comment = ({ open,postId, comments }) => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.posts)
  const [comment, setComment] = useState("");
  const handleComment = () => {

    const id = postId
    console.log(id, comment)
    dispatch(commentPost({id, comment}))

    setComment('')
    console.log(comments)

  };



    

  return (
    <>
      {open && (
        <>
          <div className="write">
          {user?.avatar ? (
                    <Avatar
                      className="commentAvatar"
                      src={user?.avatar}
                    />
                  ) : (
                    <Avatar className="commentAvatar">
                      {user?.name[0].toUpperCase()}
                    </Avatar>
                  )}
            <input
              type="text"
              placeholder="leave a comment"
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}

            />
            {comment && (
              <button onClick={handleComment}>
             <SendRoundedIcon sx={{ color: "grey"}} />
              </button>
            )}
          </div>

          <div className="comments">
            { comments && 
            comments?.length > 0 ? (
              comments?.map((item) => (
                <div key={item._id} className="comment">
                  {item.postedBy.avatar ? (
                    <Avatar
                      className="commentAvatar"
                      src={item.postedBy.avatar}
                    />
                  ) : (
                    <Avatar className="commentAvatar">
                      {item.postedBy.name[0].toUpperCase()}
                    </Avatar>
                  )}
                  <div className="info">
                    <div>
                      <span className="name">{item.postedBy.name} - </span>
                      <span className="time">
                        {moment(item.createdAt).fromNow()}
                      </span>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              )).reverse()
            ) : ("")
            }
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
