import React from "react";
import { AboutCard } from "../";

function About() {
  const about = [
    {
      icon: '<i class="fa-solid fa-shield-cat"></i>',
      heading: "Security",
      para: "AES-256 bit encryption protects your data like a digital fortress.",
    },
    {
      icon: '<i class="fa-solid fa-key"></i>',
      heading: "Password Gen",
      para: "Generate unhackable passwords using quantum randomness.",
    },
    {
      icon: '<i class="fa-solid fa-bolt"></i>',
      heading: "Zero-Knowledge Protocol",
      para: "Not even we can access your vault. Total anonymity guaranteed.",
    },
  ];
  return (
    <div className=" p-10 bg-black py-20">
        <div className="flex flex-col justify-center w-full text-center">
        <h2 className="text-2xl text-green-400 font-semibold">NEURAL SECURITY FEATURES</h2>
        <p className="text-slate-400">Military-grade protection powered by quantum encryption</p>
        </div>
    <div className="flex w-full  justify-evenly mt-7 flex-col md:flex-row gap-2">
      {about.map((ele) => (
        <AboutCard heading={ele.heading} icon={ele.icon} para={ele.para} />
      ))}
    </div>
    </div>
  );
}

export default About;
