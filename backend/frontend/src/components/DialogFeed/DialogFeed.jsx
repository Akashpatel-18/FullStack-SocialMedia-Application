import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../reducers/postSlice";
import {Avatar} from '@mui/material'

const DialogFeed = ({
  avatar,
  ownerName,
  oldpostId,
  oldcaption,
  oldimage,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(oldimage);
  const [caption, setCaption] = useState(oldcaption);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const postData = () => {
    let data = { caption, image };

    if (caption || image) {
      dispatch(updatePost({ oldpostId, data }));
      
    }
    setOpen(false);
  };

  return (
    <>
      <div className="share">
        <div className="shareTop">
          {avatar ? (
            <Avatar className="shareProfile" src={avatar} />
          ) : (
            <Avatar className="shareProfile">
              { ownerName[0].toUpperCase()}
            </Avatar>
          )}
          <span className="shareName">{ownerName}</span>
        </div>
        <input
          type="text"
          name="caption"
          value={caption && caption}
          placeholder={`What's in your mind Akash?`}
          onChange={(e) => setCaption(e.target.value)}
        />
        {image && <img src={image} alt="" />}

        <div className="shareChoose">
          <label htmlFor="image-select-new">
            <i class="fa-regular fa-image symbolImage"></i>
            <span className="shareChooseName">image</span>
            <input
              style={{ display: "none" }}
              name="newImage"
              type="file"
              id="image-select-new"
              accept=".jpeg, .png, .jpg, .gif"
              onChange={(e) => handleFileUpload(e)}
            />
          </label>
        </div>
        <div className="shareBottom" onClick={postData}>
          Save
        </div>
      </div>
    </>
  );
};

export default DialogFeed;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
