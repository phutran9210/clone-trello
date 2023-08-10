import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {loginPayload} from "../../interfaces/reduxActions"

const loginUser = createSlice({
    name : "login_user",
    initialState : {
            response : {message: "", status: 0, token : "", data : {}},
            loading: false,
            err : {statusCode : 0, message : "",error : ""}, 
    },

    reducers : {
        loginUserRequest: (state, action : PayloadAction <loginPayload>) => {
            state.loading = true;
         
          },
          loginUserSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.err = {statusCode : 0, message : "",error : ""};
         
          },
          loginUserFailure: (state, action) => {
            state.loading = false;
            state.err = action.payload;
          },
          setErr: (state) => {
            state.err.message = "";
        },
    }
})

export const { loginUserRequest,loginUserSuccess,loginUserFailure,setErr } = loginUser.actions
export default loginUser.reducer