import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {userBasicInfo} from "../../interfaces/reduxActions"

const createNewChat = createSlice({
    name : "create_new_chat",
    initialState : {
        loading : false,
        data : "",
        permisionBoard : [],
        error : null,
        selectedUser : null
    },
    reducers : {
        createChatRequess : (state,action : PayloadAction <userBasicInfo>)=>{
            state.loading = true
        },
        createChatSuccess : (state,action)=>{
            state.loading = false,
            state.data = action.payload
        },
        createPermissionRequest : (state,action : PayloadAction <{ data : string}>)=>{
            state.loading = true
        },
        createPermissionSuccess : (state,action)=>{
            state.loading = false,
            state.permisionBoard = action.payload
        },
        createChatFailure : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        selectedChatUserRequest : (state,action : PayloadAction<userBasicInfo>)=>{
            state.loading = true
        },
        selectedChatUserSuccess : (state,action)=>{
            state.loading = false,
            state.selectedUser = action.payload
        },
        setDefaultPermisionBoardRequest : (state)=>{
            state.loading = true
        },
        setDefaultPermisionBoardSuccess : (state)=>{
            console.log(state.permisionBoard);
            
            state.loading = false,
            state.permisionBoard = []
        },
    }
})

export const {createChatRequess,createChatSuccess,createChatFailure,selectedChatUserSuccess,selectedChatUserRequest,createPermissionRequest,createPermissionSuccess,setDefaultPermisionBoardRequest,setDefaultPermisionBoardSuccess} = createNewChat.actions
export default createNewChat.reducer