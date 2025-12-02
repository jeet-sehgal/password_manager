import React from "react";
import parse from "html-react-parser";


function AboutCard({icon,para,heading}) {
  return (
    
    <div className="group card w-full md:w-80 bg-base-100 card-md shadow-sm border-2 hover:border-green-500 hover:shadow-[0_0_15px_3px_rgba(34,197,94,0.6)] transition-all">
      <div className="card-body">
        <h2 className="text-lg">{parse(icon)}</h2>
        <h2 className="card-title group-hover:text-green-500 transition-all">{heading}</h2>
        <p>
         {para}
        </p>
        
      </div>
    </div>
  );
}

export default AboutCard;
