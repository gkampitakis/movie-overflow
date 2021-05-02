import React from 'react';
import { Series } from '../../types';
import Placeholder from '../../assets/placeholder.jpeg';

const imgSrc = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : Placeholder;

export function TvItem(tv: Series) {
  return (
    <>
      <img src={imgSrc(tv.poster_path)} loading="lazy" alt={tv.name} />
      <div className="details">
        <div>
          <div className="header">
            <h2>{tv.original_name}</h2>
            <p>Tv Series</p>
          </div>
          <p>{tv.first_air_date}</p>
        </div>
        <p className="overview">{tv.overview}</p>
      </div>
    </>
  );
}
