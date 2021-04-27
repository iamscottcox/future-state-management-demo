import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  write: {
    title: '',
    body: '',
  },
};

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    setDraft(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setDraft } = draftsSlice.actions;
export default draftsSlice.reducer;
