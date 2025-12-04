import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/UserSlice";
import toast from 'react-hot-toast';
import dataService from "../appwrite/data";
import { load } from "../store/MainDataSlice";

function Signup() {
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {
    setLoading(true)
    setError("");
    // console.log(data);
    try {
      const session = await authservice.signup(data);
      if (session) {
        const userData = await authservice.currentUser();
        if (userData) {
          dispatch(login(userData));
          // console.log("signin",userData)
          
          navigate("/dashboard")
        }
      }
    } catch (e) {
      setError(e.message);
      toast.error(e.message)
    }finally{
        setLoading(false)
    }
  };
  const password = watch("password");
  const list = [
    { text: "Minimum 8 char", status: password?.length >= 8 || 0 },
    { text: "Minimum 1 uppercase char", status: /[A-Z]/.test(password) },
    { text: "Minimum 1 lowercase char", status: /[a-z]/.test(password) },
    { text: "At least 1 number ", status: /[0-9]/.test(password) },
    { text: "At least 1 special char", status: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div >
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered my-3 w-full"
          {...register("name", { required: "The Username is required" })}
        />
        {errors.name && (
          <span className="text-error text-sm mt-1 block ">
            {errors.name.message}
          </span>
        )}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered my-3 w-full"
          {...register("email", {
            required: "The Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1 block">
            {errors.email.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered my-3 w-full"
          {...register("password", {
            validate: {
              minLength: (value) => value.length >= 8,
              upper: (value) => /[A-Z]/.test(value),
              lower: (value) => /[a-z]/.test(value),
              number: (value) => /[0-9]/.test(value),
              special: (value) => /[^A-Za-z0-9]/.test(value),
            },
          })}
        />
        {password && (
          <ul className="text-sm mt-1 space-y-1 w-full">
            {list.map((ele, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-2 ${
                  ele.status ? "text-success" : "text-error"
                }`}
              >
                {ele.status ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-skull"></i>
                )}
                {ele.text}
              </li>
            ))}
          </ul>
        )}
        <div role="alert" className="alert alert-error alert-outline mt-2">
          <span>
            <i class="fa-solid fa-triangle-exclamation"></i> The master password
            can't be recovered
          </span>
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered my-3 w-full"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match", 
          })}
        />
        {errors.confirmPassword && (
          <span className="text-error text-sm mt-1 block">
            {errors.confirmPassword.message}
          </span>
        )}
        {error && <span className="text-error text-sm mt-1">{error}</span>}
        <p>
          Do you have the account?{" "}
          <Link to="/login" className="text-blue-400">
            Log in
          </Link>
        </p>
        <div className="modal-action">
          <button className="btn btn-success w-full"disabled={loading} >{loading&&<span className="loading loading-spinner"></span>}Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
