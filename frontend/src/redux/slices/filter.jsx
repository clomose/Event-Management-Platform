import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : 'filterData',
    initialState : {
        filteredData: [],
        appliedFilters: false,
        isLoggedIn: false,
        user : null
    },
    reducers : {
        setFilteredData: (state, action) => {
            state.filteredData = action.payload
        },
        applyFilters: (state, action) => {
            state.appliedFilters = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setFilteredData, applyFilters, setIsLoggedIn, setUser } = filterSlice.actions
export default filterSlice.reducer
