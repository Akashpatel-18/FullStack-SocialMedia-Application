import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from "@mui/material";
import './FriendList.css'

const FriendList = ({userId, userName, userAvatar}) => {
  return (
    <>
     <div className="friendList">
      <Link className='LeftLink' to={`/profile/${userId}`}>
      {userAvatar ? (<Avatar className="userAvatar" src={userAvatar} />) : (<Avatar className="userAvatar">{userName[0].toUpperCase()}</Avatar>) }
        <span className='friendName'>{userName}</span>
        </Link>
     </div>
    </>
  )
}

export default FriendList