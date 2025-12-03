import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/UserSlice";
import toast from "react-hot-toast";
import dataService from "../appwrite/data";
import { load } from "../store/MainDataSlice";
import { decryptData } from "../encryption";

function Login() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const dispatch=useDispatch()
  const submit = async (data) => {
    setLoading(true)
    setError("")
    // console.log(data);
    try {
      const session=await authservice.signin(data);
      if(session){
        const userData=await authservice.currentUser()
        if(userData){
            dispatch(login(userData))
            await dataService.getPosts(userData.$id).then((res) => {
                      dispatch(load(res.rows.map(ele=>{return {...ele,password:decryptData(ele.password)}})));
                    })
            navigate("/dashboard")
        }
      }
    } catch (e) {
      // console.log(JSON.parse(e.response).message);
      setError(e.message)
      toast.error(e.message)

    }finally{
        setLoading(false)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="space-y-3 ">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
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
          className="input input-bordered w-full my-4"
          {...register("password", { required: "The password is required" })}
        />
        {errors.password && (
          <span className="text-error text-sm mt-1">
            {errors.password.message}
          </span>
        )}
        {error && <span className="text-error text-sm mt-1 block">{error}</span>}

        <p>
          Don't have the account?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>

        <div className="modal-action">
          <button className="btn btn-success w-full " disabled={loading}>{loading&&<span className="loading loading-spinner"></span>}Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
