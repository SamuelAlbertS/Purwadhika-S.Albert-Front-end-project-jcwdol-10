import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import BlogReducer from "./slices/blog";

const store = configureStore(
    {
        reducer : {
            auth : authReducer,
            blog : BlogReducer
        },
    }
)

export default store
