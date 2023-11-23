import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState{
    isLogin:boolean
    username?:string
    avatar?:string
}

const initialState:UserState = {
    isLogin:false,

}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:state=>{
            state.isLogin = true
        },
        logout:state=>{
            state.isLogin = false
        },
        setAvatar:(state, action: PayloadAction<string>) =>{
            state.avatar = action.payload
        }
    }
})

export const {login,logout,setAvatar} = userSlice.actions

export default userSlice.reducer