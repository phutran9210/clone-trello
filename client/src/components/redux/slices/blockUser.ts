import {createSlice} from "@reduxjs/toolkit"

const blockUser = createSlice({
    name : "block_user",
    initialState : {
        loading : false,
        error : {statusCode : 0, message : ""}, 
        response : {statusCode : 0, message : ""},
    },

    reducers : {
        blockUserRequest : (state,action)=>{
            state.loading = true;
           
        },
        blockUserSuccess : (state,action)=>{
            state.loading = false;
            state.response = action.payload
        }
        ,
        blockUserFailure : (state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
   

    }

})

export const {blockUserFailure,blockUserSuccess,blockUserRequest} = blockUser.actions

export default blockUser.reducer