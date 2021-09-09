import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./src/Reducer/navReducer";
import authReducer from "./src/Reducer/authReducer";

export const store = configureStore({
    reducer: {
        nav: navReducer,
        auth: authReducer
    }
})