import {userBasicInfo} from "../../interfaces/reduxActions"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const getPreviewChat = createSlice({
    name : "get_preview_chat",
    initialState : {
        loggedUser : null,
        selectedRoom : "",
        dataRoom : [],
        loading : false,
        data : [],
        error : {statusCode : 0, message : ""},
        hasMore : true
    },
    reducers: {
        setLoggedUserRequest : (state,action : PayloadAction<userBasicInfo>)=>{
            state.loading = true
        },

        setLoggedUserSuccess : (state,action)=>{
            state.loading = false,
            state.loggedUser = action.payload
        },

        getPreviewChatRequet : (state)=>{
            state.loading  = false
        },
        getPreviewChatSuccess : (state,action)=>{
            state.data  = action.payload
        },
        getPreviewFailure : (state,action)=>{
            state.error  = action.payload
        },
        selectRoom : (state)=>{
            state.loading = true
        },
        selectRoomSuccess : (state,action)=>{
            state.loading = false,
            state.selectedRoom = action.payload
            const isRoom = state.data.find((room) => room.room_name === action.payload)
            if (isRoom) {
                state.dataRoom = isRoom
            } else {
                state.dataRoom = state.dataRoom 
            }
        },

        updateRoomData : (state)=>{
            state.loading = true
        },
        updateRoomDataSuccess : (state,action)=>{
            const index = state.data.findIndex(room =>room.room_name === action.payload.room)
            console.log(index);
            
            if (index !== -1) {
                state.data[index].messages.push(action.payload.content);    
            }  
        },
        updateNewRoomDataSuccess : (state,action)=>{
            const index = state.data.findIndex(room =>room.room_name === action.payload.room_name)
            console.log(index);
            
            if (index === -1) {
                state.data.push(action.payload);    
            }  
        },
        getPreviewData : (state) =>{
            state.loading = true
        },
        getPreviewDataSuccess : (state,action) =>{
            state.loading = false
            const index = state.data.findIndex(room =>room.room_name === action.payload.room_name)
            if (index === -1) {
                state.data.push(action.payload);    
            }  
            
        },
        setParticipants : (state, action) =>{
            const index = state.data.findIndex(room =>room.room_name === action.payload.room_name) 
            if (index !== -1) {
                state.data[index] = action.payload
            }
        }, 

        setFirstRoomRequest : (state)=>{
            state.loading = true
        },
        setFirstRoomSuccess : (state,action)=>{
            state.loading = false;
            const index = state.data.findIndex(room =>room.room_name === action.payload.room_name)            
            if (index === -1) {
                state.data.push(action.payload);    
            }  
        },


    }
})

export const {getPreviewChatSuccess,getPreviewChatRequet,getPreviewFailure,selectRoomSuccess,selectRoom,updateRoomData,updateRoomDataSuccess,setLoggedUserRequest,setLoggedUserSuccess,updateNewRoomDataSuccess,getPreviewData,getPreviewDataSuccess,setParticipants,setFirstRoomRequest,setFirstRoomSuccess} = getPreviewChat.actions

export default getPreviewChat.reducer