import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: { isOpen: false },
  reducers: {
    openChatWindowRequest: (state) => {state.isOpen = false}  
    ,
    openChatWindowSuccess: state => {state.isOpen = true}
   
    ,
    closeChatWindow: state => {
      state.isOpen = false
    }
  },
})

export const { openChatWindowSuccess, closeChatWindow,openChatWindowRequest } = chatSlice.actions
export default chatSlice.reducer
