import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        topRatedMovies: null,
        horrorMovies: null,
        comedyMovies: null,
        actionMovies: null,
        thrillerMovies: null,
        animationMovies: null,
        sciFiMovies: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addHorrorMovies: (state, action) => {
            state.horrorMovies = action.payload;
        },
        addComedyMovies: (state, action) => {
            state.comedyMovies = action.payload;
        },
        addActionMovies: (state, action) => {
            state.actionMovies = action.payload;
        },
        addThrillerMovies: (state, action) => {
            state.thrillerMovies = action.payload;
        },
        addAnimationMovies: (state, action) => {
            state.animationMovies = action.payload;
        },
        addSciFiMovies: (state, action) => {
            state.sciFiMovies = action.payload;
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

export const {
    addNowPlayingMovies,
    addTopRatedMovies,
    addHorrorMovies,
    addComedyMovies,
    addActionMovies,
    addThrillerMovies,
    addAnimationMovies,
    addSciFiMovies,
    addTrailerVideo
} = movieSlice.actions;

export default movieSlice.reducer;