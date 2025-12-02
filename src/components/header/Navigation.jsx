import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

function Navigation({ ...props }) {
  const status = useSelector((state) => state.auth.status);
  const nanLinks = [
    {
      name: "Home",
      to: "/",
      status: true,
    },
    
    
    {
      name: "Dashboard",
      to: "/Dashboard",
      status: status,
    },
    {
      name: "Profile",
      to: "/profile",
      status: status,
    },
  ];

  return (
    <ul {...props}>
      {nanLinks.map(
        (ele) =>
          ele.status && (
            <li key={ele.name}>
              <NavLink
                to={ele.to}
                className={({ isActive }) =>
                  `${isActive ? "text-green-300" : "text-white"}`
                }
              >
                {ele.name}
              </NavLink>
            </li>
          )
      )}
    </ul>
  );
}

export default Navigation;
