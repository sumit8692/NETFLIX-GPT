import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
    if (!posterPath) return null;
    console.log(posterPath);
    return (
        <div className="w-36 md:w-48 flex-shrink-0 pr-3 cursor-pointer hover:scale-105 transition-transform duration-200">
            <img
                className="w-full rounded-md"
                src={IMG_CDN_URL + posterPath}
                alt="Movie Poster"
            />
        </div>
    );
};

export default MovieCard;