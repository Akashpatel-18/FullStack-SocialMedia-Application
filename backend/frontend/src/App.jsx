import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/home-1/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/authSlice";
import { getAllUser, getPost } from "./reducers/postSlice";
import { getUser } from "./reducers/postSlice";

const App = () => {
   const dispatch = useDispatch();
   const { user: me } = useSelector((state) => state.auth);
  //  const { user : boss } = useSelector(state => state.posts)
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  },[dispatch]);


  useEffect(() => {

    const fetchdata = () => {
      
    dispatch(getUser());
    dispatch(getPost());
    dispatch(getAllUser())
    }

   user && fetchdata()
  
  }, [dispatch,user]);



  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={ (user && me) ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/profile/:id"
          element={user ? <UserProfile /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signUp"
          element={user ? <Navigate to="/" /> : <SignUp />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
