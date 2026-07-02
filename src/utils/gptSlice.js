import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        gptMovies: null, // { movieNames: string[], movieResults: movie[][] }
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovies: (state, action) => {
            // action.payload = { movieNames: [...], movieResults: [[...], [...], ...] }
            state.gptMovies = action.payload;
        },
        clearGptMovies: (state) => {
            state.gptMovies = null;
        },
    },
})

export const { toggleGptSearch, addGptMovies, clearGptMovies } = gptSlice.actions;
export default gptSlice.reducer;