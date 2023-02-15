import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { createPost } from "../../reducers/postSlice";
import { Link } from "react-router-dom";
import './Feed.css'

const Feed = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.posts)
    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")
  
    const handleFileUpload = async (e) => {
      
      const file = e.target.files[0]
      const base64 = await convertToBase64(file)
      setImage(base64)
  } 
  
  const postData = async (e) => {

    if(image || caption){
      await dispatch(createPost({caption,image}))
    }
  
    setCaption("")
    setImage('')
  }

  return (
    <>
      <div className="share">
        <div className="shareTop">
        {
            user && ( <Link className="feedLink" to={`/profile/${user._id}`}>{user.avatar ? (
              <Avatar
                className="shareProfile"
                src={user.avatar}
              />
            ) : (
              <Avatar className="shareProfile">
                {user.name[0].toUpperCase()}
              </Avatar>
            )}
                      <span className="shareName">{user && user.name}</span>

            </Link>)
          }
        
        </div>
        <input
          type="text"
          name="caption"
          value={caption}
          placeholder={user && `What's in your mind ${user.name} ?`}
          onChange={(e) => setCaption(e.target.value)}
        />
        {image && <img src={image} alt="" />}

        <div className="shareChoose">
          <label htmlFor="image-select">
            <i class="fa-regular fa-image symbolImage"></i>
            <span className="shareChooseName">image</span>
            <input
              style={{ display: "none" }}
              name="image"
              type="file"
              id="image-select"
              accept=".jpeg, .png, .jpg, .gif"
              onChange={(e) => handleFileUpload(e)}
            />
          </label>
        </div>
        <div className="shareBottom" onClick={postData}>
          Share
        </div>
      </div>
    </>
  );
};

export default Feed;

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
