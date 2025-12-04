import React, { useEffect, useRef } from "react";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/UserSlice";
import { clearData } from "../../store/MainDataSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const timeRef=useRef(null)
  const logoutBtn=async () => {
        try {
          if(timeRef.current)clearTimeout(timeRef.current)
          await authservice.logout();
          dispatch(logout())
          dispatch(clearData())
          navigate("/")
        } catch (e) {
          // console.log(e);
        }
      }
  useEffect(()=>{
    
     timeRef=setTimeout(()=>{
      logoutBtn()
      toast.error("Session ended")
      
    },420000)
    return ()=>{if(timeRef.current)clearTimeout(timeRef.current)}
  },[])
  return (
    <button
      className="btn btn-soft btn-error"
      onClick={logoutBtn}
    >
      Logout
    </button>
  );
}

export default Logout;
