import "./DialogUpdate.css";
import {Dialog} from "@mui/material";
import DialogFeed from '../DialogFeed/DialogFeed'

const DialogUpdate = ({ open, setOpen,avatar, ownerName, postId, caption, image }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className="dialogBox">
          <h4>Update post</h4>
          <DialogFeed avatar={avatar} ownerName={ownerName} oldpostId={postId} oldcaption={caption} oldimage={image} open={open} setOpen={setOpen} />
        </div>
      </Dialog>
    </div>
  );
};

export default DialogUpdate;
