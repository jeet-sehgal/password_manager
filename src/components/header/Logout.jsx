import React from "react";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/UserSlice";
import { clearData } from "../../store/MainDataSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <button
      className="btn btn-soft btn-error"
      onClick={async () => {
        try {
          await authservice.logout();
          dispatch(logout())
          dispatch(clearData())
          navigate("/")
        } catch (e) {
          // console.log(e);
        }
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
