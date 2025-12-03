import React, { useState, useRef, useId } from "react";
import { useForm } from "react-hook-form";
import dataService from "../../appwrite/data";
import { useDispatch, useSelector } from "react-redux";
import { addData, updateData } from "../../store/MainDataSlice";
import parse from "html-react-parser";
import { encryptData } from "../../encryption";

function PassForm({ post, text, className }) {
  const dispatch = useDispatch();
  const id = useId();
  const reduxUser = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      website: post?.website || "",
      username: post?.username || "",
      password: post?.password || "",
      category: post?.category || "",
    },
  });
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (data) => {
    setError("");
    setLoading(true);
    let real_password = data.password;
    data.password = encryptData(data.password);
    let score =
      Number(real_password?.length >= 8 || 0) +
      Number(/[A-Z]/.test(real_password)) +
      Number(/[a-z]/.test(real_password)) +
      Number(/[0-9]/.test(real_password)) +
      Number(/[^A-Za-z0-9]/.test(real_password));
    let type;
    if (score < 2) type = "weak";
    else if (score < 4) type = "medium";
    else type = "strong";

    if (post) {
      const newPost = await dataService.updatePost({
        ...data,
        type,
        id: post.$id,
        userID: reduxUser.$id,
      });
      if (newPost) {
        newPost.password = real_password;
        dispatch(updateData(newPost));
      }
    } else {
      try {
        const userData = await dataService.insertPost({
          ...data,
          type,
          userID: reduxUser.$id,
        });
        if (userData) {
          userData.password = real_password;
          dispatch(addData(userData));
          // console.log(userData);
          reset();
        }
      } catch (e) {
        setError(JSON.parse(e.response).message);
      }
    }
    formRef.current.close();
    setLoading(false);
  };
  // console.log("for", post);
  const [show, setShow] = useState(false);

  const generate = () => {
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let capAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "1234567890";
    let special = "!@#$%^&*";
    let pass = "";
    pass += special[Math.floor(Math.random() * special.length)];
    pass += num[Math.floor(Math.random() * num.length)];
    pass += capAlpha[Math.floor(Math.random() * capAlpha.length)];
    for (let i = 0; i < 5; i++) {
      pass += alpha[Math.floor(Math.random() * alpha.length)];
    }

    setValue(
      "password",
      pass
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    );
  };
  return (
    <>
      <button
        className={`btn btn-success btn-soft ${className}`}
        onClick={() => document.getElementById(id).showModal()}
      >
        {parse(text)}
      </button>
      <dialog id={id} ref={formRef} className="modal">
        <div className="modal-box ">
          <div className="flex justify-between  mb-4 items-center">
            <h3 className="font-bold text-lg  ">
              {post ? "Update" : "Add"}{" "}
              <span className="text-red-500">Password</span>{" "}
            </h3>
            <form method="dialog" className="mt-2 ">
              <button className="btn w-fit modal-backdrop bg-transparent border-0 text-white">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </form>
          </div>

          <form
            method="dialog"
            onSubmit={handleSubmit(submit)}
            className="space-y-3"
          >
            <label className="text-green-400 text-xs" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="eg:- Netflix, Gmail "
              {...register("title", {
                required: true,
              })}
              className={`input input-bordered w-full ${
                errors.title && "border-red-400"
              }`}
            />
            <label className="text-green-400 text-xs" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              placeholder="https://example.com"
              {...register("website", { required: true })}
              className={`input input-bordered w-full ${
                errors.website && "border-red-500"
              }`}
            />
            <label className="text-green-400 text-xs" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="username or email"
              {...register("username", { required: true })}
              className={`input input-bordered w-full ${
                errors.username && "border-red-500"
              }`}
            />
            <label className="text-green-400 text-xs" htmlFor="password">
              Password
            </label>

            <div className="input input-bordered w-full ">
              <input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter or generate password"
                {...register("password", { required: true })}
                className={`  ${errors.password && "border-red-500"}`}
              />
              <button
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className="p-1"
                type="button"
              >
                {!show ? (
                  <i class="fa-solid fa-eye"></i>
                ) : (
                  <i class="fa-regular fa-eye-slash"></i>
                )}
              </button>
              <button
                type="button"
                className="text-green-400"
                onClick={generate}
              >
                <i class="fa-solid fa-bolt"></i>
              </button>
            </div>

            <select
              name=""
              id=""
              {...register("category", { required: true })}
              className={`select select-primary w-full ${
                errors.category && "border-red-500"
              }`}
            >
              <option value="" selected disabled={true}>
                Category
              </option>
              <option value="email">Email</option>
              <option value="development">Development</option>
              <option value="shoping">Shoping</option>
              <option value="bank">Bank</option>
              <option value="entertainment">Entertainment</option>
              <option value="social_media">Social Media</option>
              <option value="other">other</option>
            </select>
            {error && (
              <span className="text-error text-sm mt-1 block">{error}</span>
            )}
            <div className="modal-action">
              {/* Closing button inside form */}
              <button className="btn btn-success w-full" disabled={loading}>
                {loading && <span className="loading loading-spinner"></span>}{" "}
                {post ? "UPDATE" : "ADD"}
              </button>
            </div>
          </form>

          {/* Close button */}
        </div>
      </dialog>
    </>
  );
}

export default PassForm;
