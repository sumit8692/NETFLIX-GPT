import MovieCard from "./MovieCard" 

const MovieList = ({title, movies}) => {
    
    return (
        <div className="p-4 mx-16 md:p-8 mt-8 bg-transparent ">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="flex overflow-x-scroll scrollbar-hide">
                {movies
                    ?.filter((movie) => movie.poster_path) // only movies with a full poster
                    ?.map((movie) => (
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))
                }
            </div>
        </div>
    );
};

export default MovieList;