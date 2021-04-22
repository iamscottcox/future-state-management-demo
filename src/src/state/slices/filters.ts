import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    tag: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        resetFilters() {
            return initialState;
        }
    },
})

export const { setFilter, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;