import React from 'react';
import { Movie } from '../../types';
import Placeholder from '../../assets/placeholder.jpeg';

const imgSrc = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : Placeholder;

export function MovieItem(movie: Movie) {
  return (
    <>
      <img
        src={imgSrc(movie.poster_path)}
        loading="lazy"
        alt={movie.original_title}
      />
      <div className="details">
        <div>
          <div className="header">
            <h2>{movie.original_title}</h2>
            <p>Movie</p>
          </div>
          <p>{movie.release_date}</p>
        </div>
        <p className="overview">{movie.overview}</p>
      </div>
    </>
  );
}
