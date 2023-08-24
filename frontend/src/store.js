import { configureStore } from "@reduxjs/toolkit";
import auth from "./Reducers/auth.js";

export const store = configureStore({
    reducer:{
        user:auth
    }
}) 