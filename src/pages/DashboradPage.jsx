import { useState } from "react";
import { useSelector } from "react-redux";
import { PassCard, PassForm, Pie } from "../components";

function DashboradPage() {
  const [category, setCategory] = useState("all");

  const posts = useSelector((state) => state.data.data);
  // console.log(category);
  const filteredData=category=="all"?posts:posts.filter(ele=> ele.category==category)
  console.log(filteredData)
  return (
    <div className="pt-20 p-5 md:p-[10lvh] md:pt-[20lvh] flex flex-col gap-5 bg-black">
      <div>
        <h1 className="text-3xl">
          SECURE{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg,rgba(128, 242, 201, 1) 0%, rgba(14, 140, 67, 1) 66%, rgba(3, 107, 79, 1) 100%)",
              color: "transparent",
              backgroundClip: "text",
              fontWeight: "600",
            }}
          >
            PASS <i className="fa-solid fa-shield"></i>
          </span>
        </h1>
        <p className="text-slate-400"> Locked tight. Accessible only to you.</p>
      </div>
      <div className="flex gap-5 flex-col md:flex-row ">
        <PassForm text={"Add Password"} />
        <div className="input input-success p-5 outline-0">
          <i class="fa-solid fa-filter"></i>
          <select
            className="select select-ghost w-full outline-0"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="all" selected>
              All
            </option>
            <option value="email">Email</option>
            <option value="development">Development</option>
            <option value="shoping">Shoping</option>
            <option value="bank">Bank</option>
            <option value="entertainment">Entertainment</option>
            <option value="social_media">Social Media</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      {posts.length!=0&&<div className="flex flex-col gap-3 py-5">
        {filteredData.length==0?<h1 className="text-xl text-center text-green-400">No Data For This Category</h1>:filteredData.map((ele) => <PassCard key={ele.$id} post={ele} />)}
      </div>}
      <Pie/>
      
    </div>
  );
}

export default DashboradPage;
