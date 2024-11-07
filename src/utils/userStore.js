 import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const userStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    }
});

export default userStore;