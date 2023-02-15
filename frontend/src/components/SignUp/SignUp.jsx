import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import './SignUp.css'
import {Avatar} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect} from "react";
import { CircularProgress } from "@mui/material";
import { deleteError, register } from "../../reducers/authSlice";
import {toast} from 'react-toastify'

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error} = useSelector(state => state.auth)
  const [formValue, setFormValue] = useState({name:"", email:"", password:""})

 useEffect(() => { 
    error && toast.error(error)
    dispatch(deleteError())
  },[error,dispatch])


  const onInputChange = (e) => {
    setFormValue({...formValue, [e.target.name]:e.target.value })
  }

  const onSubmitChange = (e) => {
    e.preventDefault()

    if(formValue.name && formValue.email && formValue.password){
      dispatch(register({formValue,navigate, toast}))
    }

  }

  
  return (
    <>
      <div className="signUpwrapper">
        <div className="card">
          <div className="signupleft">
            <h3 className="signuplogo">Websocial</h3>
            <span className="signupdesc">
              Connect with friends and the world around you on WebSocial
            </span>
          </div>
          <div className="signupright">
            <div className="signupbox">
              <div className="loginProfile" style={{display:"none"}}>
                <Avatar sx={{width:"110px",height:"100px",backgroundColor:"#bbb"}} />
                <label htmlFor="chooseImage"><CameraAltIcon sx={{fontSize:"22px",color:"#666"}} />image</label>
                <input
                  type="file"
                  id="chooseImage"
                  name="avatar"
                  style={{ display: "none" }}
                  required
                />
              </div>
              <form onSubmit={onSubmitChange}>
                <input type="text" placeholder="Username" name="name" value={formValue.name} onChange={onInputChange} required />
                <input type="email" placeholder="Email" name="email" value={formValue.email} onChange={onInputChange} required />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formValue.password}
                  onChange={onInputChange}
                  required
                />
                 {
                  loading ? (
                    <div className="loginLoading">
                      <CircularProgress  />
                    </div>
                  ) :  (
                    <input type="submit" value="Sign Up" />
                  )
                }
                <p>
                  Already have an account ?<Link to="/login"> Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
