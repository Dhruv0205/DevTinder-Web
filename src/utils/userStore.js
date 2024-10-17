import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const userStore = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default userStore;