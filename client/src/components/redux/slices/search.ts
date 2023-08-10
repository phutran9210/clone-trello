import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {dataSearch} from "../../interfaces/reduxActions"

const searchInput = createSlice({
    name : "search",
    initialState : {
        response : [],
        error : {statusCode : 0, message : ""},
        loading : false
    },
    reducers:{
        searchRequest: (state, action : PayloadAction<dataSearch>) => {
            state.loading = true;
         
          },
          searchSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = {statusCode : 0, message : ""};
         
          },
          searchFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          
          },
          updateStateSearch : (state, action: PayloadAction<{id: number, status: string}>)=>{
            const { id, status } = action.payload;
            
            state.response.forEach(user => {
              const friendshipIndex = user.sentFriendships.findIndex(friendship => friendship.id === id);
              if (friendshipIndex !== -1) {
                  user.sentFriendships[friendshipIndex].status_id = status;
              }
            });
          },
          updateCancelStateSearch : (state, action: PayloadAction<{id: string, status: string}>)=>{
            const { id, status } = action.payload;
            
            const index = state.response.findIndex(user => user.user_id === id)
            console.log(index);
            
            if (index !== -1) {
              state.response[index].sentFriendships = [];
              state.response[index].requestedFriendships = [];
            }
          },
          
          
          

    }
})

export const {searchRequest,searchSuccess,searchFailure,updateStateSearch,updateCancelStateSearch} = searchInput.actions
export default searchInput.reducer