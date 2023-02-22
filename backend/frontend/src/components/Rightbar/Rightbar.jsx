import React from "react";
import Feed from "../Feed/Feed";
import "./Rightbar.css";

const Rightbar = () => {


  return (
    <>
      <div className="rightbar">
        <div className="shareWrapper">
          {/* <Feed /> */}
{/*           <div className="share">
            <div className="shareTop">
              <img
                className="shareProfile"
                src="https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507__340.jpg"
                alt=""
              />
              <span className="shareName">Akash Patel</span>
            </div>
            <input type="text" name="caption" value={caption} placeholder={`What's in your mind Akash?`} onChange={(e) => setCaption(e.target.value)} />
            { image &&
              <img
              src={image}
              alt=""
            />
            }
            
            <div className="shareChoose">
              <label htmlFor="image-select">
              <i className="fa-regular fa-image symbolImage"></i>
              <span className="shareChooseName">image</span>
              <input style={{display:"none"}}  name="image" type="file" id="image-select" accept='.jpeg, .png, .jpg, .gif' 
                onChange={(e) => handleFileUpload(e)} />
                </label>
            </div>
            <div className="shareBottom" onClick={postData}>Share</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Rightbar;


