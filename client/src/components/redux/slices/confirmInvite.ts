
import {createSlice} from "@reduxjs/toolkit"

const confirmInviteUser = createSlice({
    name : "confirmInvite_user",
    initialState : {
        loading : false,
        error : {statusCode : 0, message : ""}, 
        response : {statusCode : 0, message : ""},
    },

    reducers : {
        confirmUserRequest : (state,action)=>{
            state.loading = true;
           
        },
        confirmUserSuccess : (state,action)=>{
            state.loading = false;
            state.response = action.payload
        }
        ,
        confirmUserFailure : (state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
   

    }

})

export const {confirmUserFailure,confirmUserSuccess,confirmUserRequest} = confirmInviteUser.actions

export default confirmInviteUser.reducer