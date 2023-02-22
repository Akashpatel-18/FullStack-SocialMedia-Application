import "./EditProfile.css";
import { Dialog } from "@mui/material";
import { Avatar } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser} from "../../reducers/postSlice";
const EditProfile = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.posts);

  const [formValue, setFormValue] = useState({
    avatar: "",
    name: `${user?.name}`,
    email: `${user?.email}`,
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormValue({ ...formValue, avatar: base64 });
  };

  const onInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmitChange = (e) => {
    e.preventDefault();
    

    dispatch(editUser(formValue))
  

    setOpen(false)
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className="editDialogBox">
          <h4>Edit Profile</h4>
          {user && (
            <div className="editWrapper">
              <div className="editBox">
                <div className="editProfile">
                  {formValue.avatar ? (
                    <Avatar className="editAvatar" src={formValue.avatar} />
                  ) : user.avatar ? (
                    <Avatar className="editAvatar" src={user.avatar}></Avatar>
                  ) : (
                    <Avatar className="editAvatar"></Avatar>
                  )}
                  <label htmlFor="chooseImage1">
                    <CameraAltIcon className="cameraAltIcon" />
                    image
                  </label>
                  <input
                    type="file"
                    id="chooseImage1"
                    name="avatar"
                    accept=".jpeg, .png, .jpg, .gif"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e)}
                  />
                </div>
                <form onSubmit={onSubmitChange}>
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    value={formValue.name}
                    onChange={onInputChange}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formValue.email}
                    onChange={onInputChange}
                    required
                  />
                  <input
                  style={{display:"none"}}
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formValue.password}
                    onChange={onInputChange}
                  />

                  <input type="submit" value="Save" />
                </form>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default EditProfile;

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
