import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
 name:"request",
 initialState: null,
 reducers:{
    addRequest:(state, action)=>{
        return action.payload;
    },
    removeRequest:(state, action)=>{
      const Requests = state.filter(user => user._id !== action.payload);
      return Requests;
    }
 },
});

export const{addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;