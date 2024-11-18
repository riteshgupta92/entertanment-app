import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Navbar/Spinner";

const MoviesDetailsPage = () => {
  const { id } = useParams();
  console.log('Navigating to movie details page with id:', id);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer visibility
  
  useEffect(() => {
    const getMovieData = async () => {
      try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=5feda587f1f255bcb4972ddf3e20720a`;
        const movieImagesUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=5feda587f1f255bcb4972ddf3e20720a`;
        const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5feda587f1f255bcb4972ddf3e20720a`;

        const [movieResponse, imagesResponse, trailerResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(movieImagesUrl),
          fetch(trailerUrl),
        ]);

        const movieData = await movieResponse.json();
        const imageData = await imagesResponse.json();
        const trailerData = await trailerResponse.json();

        setMovieDetails(movieData);
        setMovieImages(imageData.backdrops);

        const officialTrailer = trailerData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerUrl(officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : "");
      } catch (err) {
        console.log(err);
      }
    };

    getMovieData();
  }, [id]);

  if (!movieDetails) {
    return (
      <div className="dark:bg-[#10141e] text-xl dark:text-white px-4 min-h-screen"><Spinner/></div>
    );
  }
 
  const { runtime, status, genres, adult, homepage } = movieDetails;

  return (
    <div className="dark:bg-[#10141e] dark:text-white p-6 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1000px] h-auto gap-8 bg-transparent grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 p-5 rounded-md shadow-sm dark:shadow-blue-100 shadow-black">
        <div className="flex justify-center items-center overflow-hidden rounded-md mb-4 md:mb-0">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="p-2">
          <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>
          <h5 className="mb-5 dark:text-[#a9aebb] ">Synopsis:</h5>
          <p className="text-lg mb-4">{movieDetails.overview}</p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Release Date:</strong> {new Date(movieDetails.release_date).toLocaleDateString()}
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Rating:</strong> {movieDetails.vote_average}
            <span className="mx-2">⭐️⭐️⭐️⭐️☆</span><span> ({movieDetails.vote_count} votes)</span>
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Movie Length:</strong> {runtime} minutes
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Language:</strong> <span> {movieDetails.original_language}</span>
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Status:</strong> {status}
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Genre:</strong> {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-md mb-4">
            <strong className="dark:text-[#a9aebb]">Adult Content:</strong> {adult ? "Yes" : "No"}
          </p>

          <div className="flex gap-4 mt-4">
            {trailerUrl && (
              <button
                onClick={() => setShowTrailer(true)} // Show trailer on button click
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Watch Trailer
              </button>
            )}
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      {movieImages.length > 0 && (
        <div className="w-full max-w-[1000px] mt-10">
          <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movieImages.slice(0, 12).map((image, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-auto rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      {showTrailer && trailerUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-black p-4 rounded-md max-w-2xl w-full">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="315"
                src={trailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesDetailsPage;
