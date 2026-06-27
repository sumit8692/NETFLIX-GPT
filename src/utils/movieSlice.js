import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo: (state, action) => {
            const { movieId, trailerVideo } = action.payload;
            if (!state.nowPlayingMovies) return;

            const movieIndex = state.nowPlayingMovies.findIndex(movie => movie.id === movieId);
            if (movieIndex !== -1) {
                state.nowPlayingMovies[movieIndex].trailerVideo = trailerVideo;
            }
        }
    }
})

export const { addNowPlayingMovies, addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer