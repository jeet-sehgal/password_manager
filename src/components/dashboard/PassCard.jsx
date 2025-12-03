import React, { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import dataService from "../../appwrite/data";
import { useDispatch } from "react-redux";
import { removeData } from "../../store/MainDataSlice";
import toast from "react-hot-toast";
import PassForm from "./PassForm";

function PassCard({ post }) {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const icon = {
    email: '<i class="fa-solid fa-envelope-open"></i>',
    development: '<i class="fa-solid fa-code"></i>',
    shoping: '<i class="fa-solid fa-basket-shopping"></i>',
    bank: '<i class="fa-solid fa-piggy-bank"></i>',
    entertainment: '<i class="fa-regular fa-face-laugh-beam"></i>',
    social_media: '<i class="fa-solid fa-hashtag"></i>',
    other: '<i class="fa-solid fa-lock"></i>',
  };
  const typeBG = {
    strong: "badge-success ",
    medium: "badge-warning ",
    weak: "badge-error",
    
  };
  const typeText = {
    strong: "text-green-500 ",
    medium: "text-yellow-500 ",
    weak: "text-red-500",
    
  };
  const remove = async () => {
    const data = await dataService.deletePost(post.$id);
    dispatch(removeData(post.$id));
  };
  // console.log("post aa gya card mai ", post);
  return (
    <div className="flex flex-col md:flex-row justify-between border-1 border-gray-500 hover:shadow-[0_0_5px_3px_rgba(34,197,94,0.6)] transition-all rounded-xl p-5">
      <div className="flex justify-start gap-3">
        <div className="avatar p-2 border-2 border-green-500 rounded-xl h-fit text-green-500">
          {parse(icon[post.category])}
        </div>
        <div className="flex flex-col gap-1  ">
          <div className="flex gap-2 md:gap-4 justify-between">
            <div>
              <h1 className="text-blue-500 break-all max-w-30">{post.title}</h1>
              <div className="badge badge-outline badge-success">
                {post.category
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </div>
            </div>
            <div>
              <div className="indicator ">
                <span
                  className={`indicator-item indicator-middle indicator-start badge p-1 h-1   ${
                    typeBG[post.type]
                  } `}
                ></span>
                <div
                  className={`${
                    typeText[post.type]
                  } grid  px-4 place-items-center`}
                >
                  {post.type}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-slate-500">{post.username}</p>
            <a
              href={post.website}
              target="_blank"
              className="text-blue-400 cursor-pointer break-all  "
            >
              {post.website}
            </a>
          </div>
          <div className="input input-bordered flex items-center gap-1 border-green-400 outline-none p-1 md:w-fit w-[90%] ">
            <input
              type={show ? "text" : "password"}
              value={post.password}
              onClick={() => {
                try {
                  navigator.clipboard.writeText(post.password);
                  toast.success("Password is Copied");
                } catch (e) {
                  toast.error("Some Error Occured");
                }
              }}
              readOnly
              className="p-2 w-[90%]"
            />
            <button
              onClick={() => {
                setShow((prev) => !prev);
              }}
              className="p-1"
            >
              {!show ? (
                <i class="fa-solid fa-eye"></i>
              ) : (
                <i class="fa-regular fa-eye-slash"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 h-fit">
        {post && (
          <PassForm
            text='<i class="fa-regular fa-pen-to-square"></i>'
            post={post}
            className="bg-transparent border-0"
          />
        )}
        <button className="text-red-600" onClick={remove}>
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default PassCard;
