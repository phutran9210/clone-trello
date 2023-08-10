
import {createSlice} from "@reduxjs/toolkit"

const getChat = createSlice({
    name : "get_chat",
    initialState : {
        loading : false,
        page : 1,
        data : [],
        error : {statusCode : 0, message : ""},
        isLoaded : false,
        hasMore : true
    },
    reducers:{
        getChatRequest : (state)=> {
            state.loading = true;
        },
        getPreChat : (state)=>{
            state.loading = false;
        },
        getChatSuccess : (state,action)=> {
            state.loading = false;
            state.error =  {statusCode : 0, message : ""};
            state.data = action.payload
        },
        getChatFailure : (state,action)=> {
            state.loading = false;
            state.error = action.payload;
        },
        sendDataToUpdate : (state)=>{
            state.loading = true
        },

        setLoaded: (state) => {
            state.isLoaded = true;
          },
        
        setPage : (state)=>{
            state.page = state.page +1
        },

        changeChatState:(state)=>{
            state.loading = true
        },
        addToCurrentState :(state, action)=>{
            state.loading = false
            if (state.data[0].room_name = action.payload.room) {
                state.data[0].messages.push(action.payload.content)
            } else {
                return state
            }
            
        },

        setHasMore : (state,action)=>{
            state.hasMore = action.payload
        },

        getMoreChat : (state)=>{
            state.loading = true
        },
        getMoreChatSuccess : (state,action)=>{

            if (!action.payload) {
                return state
            }
  
            if (state.data[0].room_name = action.payload[0].room_name) {
                        
                state.data[0].messages = [...action.payload[0].messages,...state.data[0].messages]

                
            } else {
                return state
            }
        }
        
    }
})

export const {getChatRequest,getChatSuccess,getChatFailure,sendDataToUpdate,setLoaded,changeChatState,addToCurrentState,getPreChat,setPage,getMoreChat,getMoreChatSuccess,setHasMore} = getChat.actions
export default getChat.reducer