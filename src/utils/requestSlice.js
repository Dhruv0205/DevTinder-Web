import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], // Initialize state as an empty array
  reducers: {
    addRequest: (state, action) => {
      return action.payload; // This will replace the state with the new requests
    },
    removeRequest: (state, action) => {
      // Filter out the request by matching _id and return the updated list
      const filteredRequests = state.filter(user => user._id !== action.payload);
      return filteredRequests;
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
