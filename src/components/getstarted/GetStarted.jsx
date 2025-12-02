import React from "react";
import encryption from "../../assets/encryption.gif";
import { useNavigate } from "react-router-dom";

function GetStarted() {
    const navigate=useNavigate()
  return (
    <div
      className="p-10  flex flex-col bg-transparent text-center py-20"
      style={{ backgroundImage: `url(${encryption})` }}
    >
      <h1 className=" w-fit  m-auto bg-black text-3xl text-green-400">
        READY TO GO CYBER?
      </h1>
      <p className="  w-fit m-auto bg-black text-slate-500">
        Join the neural network. Secure your digital life.
      </p>
      <button className="  w-fit m-auto bg-black btn  btn-soft btn-success mt-4" onClick={()=>{navigate("/signup")}}>
        START YOUR TRAIL
      </button>
    </div>
  );
}

export default GetStarted;
