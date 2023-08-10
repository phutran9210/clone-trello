import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const createBoard = createSlice({
    name : "create_board",
    initialState : {
        loading : false,
        data : "",
        error : ""
    },
    reducers : {
        createBoardRequest : (state, action : PayloadAction<any>) =>{
            state.loading = false
        },
        createBoardSuccess : (state , action)=>{
            state.loading = true,
            state.data = action.payload
        },
        createBoardFailure : (state , action)=>{
            state.loading = true,
            state.error = action.payload
        }
    }
})

export const {createBoardRequest,createBoardSuccess,createBoardFailure} = createBoard.actions
export default createBoard.reducer