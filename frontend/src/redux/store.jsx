import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './slices/filter'

const store = configureStore({
    reducer : {
        filter : filterReducer
    }
})

export default store;
