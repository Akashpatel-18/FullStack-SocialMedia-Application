import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import './Navbar.css'
import { useSelector } from "react-redux";

const Navbar = () => {

  const { user } = useSelector(state => state.posts)

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{textDecoration:"none"}}>
        <span>websocial</span></Link>
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="menus">
          <i className="fa-solid fa-magnifying-glass rightsearch"></i>
          <i className="fa-regular fa-plus rightplus"></i>
          {
            user && ( <Link style={{textDecoration:"none", color:"inherit"}} to={`/profile/${user._id}`}>{user.avatar ? (
              <Avatar
                className="navAvatar"
                src={user.avatar}
              />
            ) : (
              <Avatar className="navAvatar">
                {user.name[0].toUpperCase()}
              </Avatar>
            )}</Link>)
          }
         
  
        </div>
      </div>
    </>
  );
};

export default Navbar;
