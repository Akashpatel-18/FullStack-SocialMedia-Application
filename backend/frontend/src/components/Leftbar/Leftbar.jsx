import React, {useState, useEffect} from "react";
import FriendList from "../FriendList/FriendList";
import {useSelector, useDispatch} from 'react-redux';
import { CircularProgress } from "@mui/material";
import { searchUser } from '../../reducers/postSlice'
import "./Leftbar.css";

const Leftbar = () => {

  const dispatch = useDispatch()
  const [person, setPerson] = useState('')
  const {allUser} = useSelector(state => state.posts)
  const {searchUser : goneSearch } = useSelector(state => state.posts)

  useEffect(() => {

    if(person){
      dispatch(searchUser(person))
    }

  },[dispatch, person])

  return (
    <>
      <div className="leftbar">
        <div className="searchWrapper">
          <input
            type="text"
            placeholder="Search for friends"
            className="searchInput"
            onChange={(e) => setPerson(e.target.value)}
          />

        {
          person ? (
             goneSearch && (
              !goneSearch.length ? (
                <CircularProgress />
              ) : (
                goneSearch.map((user) => (
                  <FriendList 
                  key={user._id}
                    userId={user._id}
                    userName={user.name}
                    userAvatar={user.avatar}
                  />
                )).reverse()
              )
            )
            
          ) : (
             allUser && (
              !allUser.length ? (
                <CircularProgress />
              ) : (
                allUser.map((user) => (
                  <FriendList 
                  key={user._id}
                    userId={user._id}
                    userName={user.name}
                    userAvatar={user.avatar}
                  />
                )).reverse()
              )
            )
            
          )
        }

   
        
        </div>
      </div>
    </>
  );
};

export default Leftbar;
