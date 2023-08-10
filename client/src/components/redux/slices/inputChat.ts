import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    inputValue: "", 
  },
  reducers: {
    updateInputValue: (state) => {
      state.inputValue = "";
    },
    setInputValue: (state, action) => {
      console.log(state.inputValue);
      
      state.inputValue = action.payload;
    },
    setState: () => {
      return { inputValue: "" }; 
    }
  },
});

export const { updateInputValue,setInputValue,setState } = chatSlice.actions;

export default chatSlice.reducer;
