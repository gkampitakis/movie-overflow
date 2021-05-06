import React from 'react';
import { Series } from '../../types';
import { getImage } from '../../utils';

export function TvItem(tv: Series) {
  return (
    <>
      <img
        src={getImage(tv.poster_path, '185')}
        loading="lazy"
        alt={tv.original_name}
      />
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
