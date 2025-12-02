import {configureStore} from "@reduxjs/toolkit"
import UserReducerSlice from "./UserSlice"
import MainDataSlice from "./MainDataSlice"

const store=configureStore({
    reducer:{
        auth:UserReducerSlice,
        data:MainDataSlice,
    }
})

export default store