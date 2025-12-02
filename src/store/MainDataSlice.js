import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:[],
    
}

const MainDataSlice=createSlice({
    name:"mainData",
    initialState,
    reducers:{
        load:(state,action)=>{
            state.data=[...action.payload]
        },
        addData:(state,action)=>{
            state.data.push(action.payload)
        },
        loadData:(state,action)=>{
            state.data=action.payload
        },
        removeData:(state,action)=>{
            state.data=state.data.filter(ele=>ele.$id!==action.payload)
        },
        updateData:(state,action)=>{
            state.data=state.data.map(ele=>ele.$id==action.payload.$id?{...action.payload}:ele)
        },
        clearData:(state,action)=>{
            state.data=[]
        },

    }
})

export const {addData,removeData,updateData,loadData,load}=MainDataSlice.actions

export default MainDataSlice.reducer