import { createSlice } from "@reduxjs/toolkit";
import stat from "daisyui/components/stat";

const initialState = {
  status: false,
  userData: null,
};

const UserSlice = createSlice({
  name: "userSLice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
        state.status=false;
        state.userData=null;
    },
    add:(state,action)=>{
        if(state.status){
            state.userData={...state.userData,...action.payload}
        }
    }
  },
});

export default UserSlice.reducer

export const {login,logout,add} = UserSlice.actions