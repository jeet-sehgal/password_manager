import React from "react";
import { Logout, Navigation } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png"


function Header() {
  const status=useSelector(state=>state.auth.status)
  return (
    <div className="navbar z-50 bg-base-100 shadow-sm bg-black fixed ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <Navigation
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          />
        </div>
        <Link to="/"className="btn btn-ghost text-xl"><img src={logo} alt="" className="w-12 rounded-xl avatar"/></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Navigation className="menu menu-horizontal px-1" />
      </div>
      <div className="navbar-end">
        
        {status&&<Logout/>}
        {!status&&<><Link to="/signup"><button className="btn btn-soft btn-info mr-1">Sign Up</button></Link>
        <Link to="/login"><button className="btn btn-soft btn-success">Log In</button></Link></>}
      </div>

    </div>
    
  );
}

export default Header;
