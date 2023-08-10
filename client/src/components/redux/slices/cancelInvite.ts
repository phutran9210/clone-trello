
import {createSlice} from "@reduxjs/toolkit"

const cancelInviteUser = createSlice({
    name : "cancelInvite_user",
    initialState : {
        loading : false,
        error : {statusCode : 0, message : ""}, 
        response : {statusCode : 0, message : ""},
    },

    reducers : {
        cancelUserRequest : (state,action)=>{
            state.loading = true;
           
        },
        cancelUserSuccess : (state,action)=>{
            state.loading = false;
            state.response = action.payload
        }
        ,
        cancelUserFailure : (state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
   

    }

})

export const {cancelUserFailure,cancelUserSuccess,cancelUserRequest} = cancelInviteUser.actions

export default cancelInviteUser.reducer