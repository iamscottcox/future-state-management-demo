import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    writeArticle: {
        title: '',
        strapline: '',
        synopsis: '',
    }
}

export type DraftsState = typeof initialState;

const draftsSlice = createSlice({
    name: 'drafts',
    initialState,
    reducers: {
        setDraft(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    }
})

export const { setDraft } = draftsSlice.actions;
export default draftsSlice.reducer;