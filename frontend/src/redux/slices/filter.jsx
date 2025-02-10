import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : 'filterData',
    initialState : {
        filteredData: [],
        appliedFilters: false
    },
    reducers : {
        setFilteredData: (state, action) => {
            state.filteredData = action.payload
        },
        applyFilters: (state, action) => {
            state.appliedFilters = action.payload
        }
    }
})

export const { setFilteredData, applyFilters } = filterSlice.actions
export default filterSlice.reducer
