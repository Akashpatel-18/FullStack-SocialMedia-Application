import React,{useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import { deleteError, login } from "../../reducers/authSlice";
import {toast} from 'react-toastify'
import { CircularProgress } from "@mui/material";
import "./Login.css";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error, loading} = useSelector(state => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    error && toast.error(error)
    dispatch(deleteError())
  },[error, dispatch])

  const loginHandler = (e) =>{
    e.preventDefault()

    const formValue = {email, password}

    if(email && password){
      dispatch(login({formValue, navigate, toast}))
    
    }

  }


  return (
    <>
      <div className="signInwrapper">
        <div className="signIncard">
          <div className="signInleft">
            <h3 className="signInlogo">Websocial</h3>
            <span className="signIndesc">
              Connect with friends and the world around you on WebSocial
            </span>
          </div>
          <div className="signInright">
            <div className="signInbox">
              <form onSubmit={loginHandler}>
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link to="" className="signInforgotpassword">
                  Forgot Password ?
                </Link>
                {
                  loading ? (
                    <div className="loginLoading">
                     <CircularProgress  />
                    </div>
                  ) :  (
                    <input type="submit" value="Sign in" />
                  )
                }
               
                <p>
                  Don't have an account ?<Link to="/signup"> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
