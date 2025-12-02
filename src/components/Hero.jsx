import React from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate=useNavigate()
  return (
    <>
      <div
        className="grid h-screen max-h-screen bg-black overflow-hidden 
                grid-rows-[1fr_1fr] md:grid-rows-1 md:grid-cols-[2fr_1fr]"
      >
        {/* Spline on mobile, but moves to right on md */}
        <div className="order-1 md:order-2 w-full h-full">
          <Spline
            scene="https://prod.spline.design/zCpQvWJj8CdHkyRb/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Text block */}
        <div
          className="order-2 md:order-1 
  flex flex-col items-start justify-center 
  text-white p-4 
  w-full 
  max-w-sm       
  md:max-w-lg     
  lg:max-w-xl     
  xl:max-w-2xl    
  m-auto leading-tight"
        >
          <h3
            className="text-3xl         
  sm:text-4xl     
  md:text-5xl    
  lg:text-6xl leading-tight font-semibold "
          >
            Your digital life deserves better{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,rgba(128, 242, 201, 1) 0%, rgba(14, 140, 67, 1) 66%, rgba(3, 107, 79, 1) 100%)",
                color: "transparent",
                backgroundClip: "text",
                fontWeight: "600",
              }}
            >
              ARMOR <i class="fa-solid fa-shield"></i>
            </span>
          </h3>
          <p>Locked tight. Accessible only to you.</p>
          <button className="btn btn-outline btn-success mt-4" onClick={()=>{navigate("/signup")}}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
