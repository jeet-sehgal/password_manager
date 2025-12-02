import React from "react";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/UserSlice";

function Logout() {
  const dispatch=useDispatch()
  return (
    <button
      className="btn btn-soft btn-error"
      onClick={async () => {
        try {
          await authservice.logout();
          dispatch(logout())
          dispatch()
        } catch (e) {
          console.log(e);
        }
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
