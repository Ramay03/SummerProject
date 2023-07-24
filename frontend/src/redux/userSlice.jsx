import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Name : "", 
    Email : "",
    Mobile : "",
    _id : "",
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginRedux : (state,action) => {
            // console.log(action.payload.data)
            state._id = action.payload.data._id
            state.Name = action.payload.data.Name
            state.Email = action.payload.data.Email
            state.Mobile = action.payload.data.Mobile
        },
        logoutRedux : (state, action)=>{
            state._id = ""
            state.Name = ""
            state.Email = ""
            state.Mobile = ""
        }
    }
})
 
export const {loginRedux, logoutRedux} = userSlice.actions

export default userSlice.reducer