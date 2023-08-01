import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        user: authReducer
    }
})

export default store;