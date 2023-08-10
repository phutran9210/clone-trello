import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const profileUser = createSlice({
    name : "profile_user",
    initialState : {
            response : {status : 0, result : []},
            loading: false,
            err : {statusCode : 0, message : "",error : ""}, 
    },

    reducers : {
        profileUserRequest: (state, action) => {
            state.loading = true;
         
          },
          profileUserSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.err = {statusCode : 0, message : "",error : ""};
         
          },
          profileUserFailure: (state, action) => {
            state.loading = false;
            state.err = action.payload;
          },
        
    }
})

export const { profileUserRequest,profileUserSuccess,profileUserFailure } = profileUser.actions
export default profileUser.reducer