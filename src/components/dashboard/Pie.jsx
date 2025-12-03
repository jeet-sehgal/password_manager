import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const COLORS = ["#08D458", "#FAC000", "#ED0909"];

function PieChartDia() {
  let  data = [
  { name: "strong", value: 0 },
  { name: "medium", value: 0 },
  { name: "weak", value: 0 },
];

  const mainData=useSelector(state=>state.data.data)
  mainData.map(ele=>{
    if(ele.type=="strong")data[0].value+=1
    else if(ele.type=="medium")data[1].value+=1
    else if(ele.type=="weak")data[2].value+=1
  })
  return (
    mainData.length==0?<h1 className="text-2xl text-center md:text-4xl text-green-400">Add a Password</h1>:<div className="card bg-transparent shadow-xl  ">
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-4 text-2xl">Password<span style={{background:
                  "linear-gradient(90deg,rgba(128, 242, 201, 1) 0%, rgba(14, 140, 67, 1) 66%, rgba(3, 107, 79, 1) 100%)",
                color: "transparent",
                backgroundClip: "text",
                fontWeight: "600",}}>Health </span></h2>

        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${value}`} // 👈 show count on slice
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip style={{ borderRadius: "50%", display: "none" }} />
          
          <Legend />
        </PieChart>
      </div>
    </div>
    
  );
}

export default PieChartDia;
