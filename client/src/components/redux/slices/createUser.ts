  import {createSlice,PayloadAction } from "@reduxjs/toolkit"
  import { DataForm } from "../../interfaces/regiterUpload";

  const createUser = createSlice({
    name: 'create_user',
    initialState: { 
    response : {messenger: "", code: 0, confirmCode : "", user_id : "",},
    loading: false,
    error : {statusCode : 0, message : ""}, 
    hasError: false 
    },
    
    reducers: {
      registerUserRequest: (state, action : PayloadAction <DataForm>) => {
        state.loading = true;
        state.hasError = false;
      },
      registerUserSuccess: (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = {statusCode : 0, message : ""};
        state.hasError = false; 
      },
      registerUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasError = true;
      },
      registerConfirmUserRequest : (state,action : PayloadAction<{ username : string, password : string}>) =>{
        state.loading = true;
      }
      ,
      registerConfirmUserSuccess: (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = {statusCode : 0, message : ""};
        state.hasError = false; 
      },
      registerConfirmUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasError = true;
      },
      setCode: (state, action: PayloadAction<number>) => {
        state.response.code = action.payload;
    },
    },
  })
  
  export const { registerUserRequest, registerUserSuccess, registerUserFailure,setCode,registerConfirmUserRequest, registerConfirmUserSuccess, registerConfirmUserFailure  } = createUser.actions;

  export default createUser.reducer;