import React from "react";
import { Signup } from "../components";

function SignupPage() {
  return (
    <div className="pb-[10lvh] pt-[20lvh] w-3/4 md:w-2/4 m-auto ">
      <fieldset class="border border-gray-500 p-6 rounded-lg">
        <legend class="px-2 font-semibold text-lg">Sign Up</legend>
        <div className=" w-full ">
          <Signup />
        </div>
      </fieldset>
    </div>
  );
}

export default SignupPage;
