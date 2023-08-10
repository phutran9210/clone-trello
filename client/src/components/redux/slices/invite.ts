
import {createSlice} from "@reduxjs/toolkit"

const inviteUser = createSlice({
    name : "invite_user",
    initialState : {
        loading : false,
        error : {statusCode : 0, message : ""}, 
        response : {statusCode : 0, message : ""},
    },

    reducers : {
        inviteUserRequest : (state,action)=>{
            state.loading = true;
            state.error = {statusCode : 0, message : ""}
        },
        inviteUserSuccess : (state,action)=>{
            state.loading = false;
            state.response = action.payload
        }
        ,
        inviteUserFailure : (state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        confirmUserRequest : (state,action)=>{
            state.loading = true;
            state.error = {statusCode : 0, message : ""}
        },

    }

})

export const {inviteUserRequest,inviteUserSuccess,inviteUserFailure,confirmUserRequest} = inviteUser.actions
export default inviteUser.reducer