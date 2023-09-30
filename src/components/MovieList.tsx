// MovieList.js

import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
 const MovieListComponent = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
};