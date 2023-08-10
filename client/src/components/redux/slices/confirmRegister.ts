
import {createSlice,PayloadAction } from "@reduxjs/toolkit"

const confirmCode = createSlice({
    name : "confirm_code",
    initialState : {
         loading : false,
         error : {statusCode : 0, message : ""}, 
        response : {message : "", status : 0}
    },

    reducers : {
        confirmRequest : (state, action : PayloadAction<{ user_id: string; code: string }>)=>{
            state.loading = true;
        },
        confirmSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = {statusCode : 0, message : ""};
          
          },
          confirmFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          
          },
    }
})

export const {confirmRequest,confirmSuccess,confirmFailure} = confirmCode.actions;
export default confirmCode.reducer