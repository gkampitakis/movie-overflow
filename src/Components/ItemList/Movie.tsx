import React from 'react';
import { Movie } from '../../types';
import { getImage } from '../../utils';

export function MovieItem(movie: Movie) {
  return (
    <>
      <img
        src={getImage(movie.poster_path, '185')}
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
