import React from 'react';
import { Person } from '../../types';

const imgSrc = (path: string, name: string) =>
  path
    ? `https://image.tmdb.org/t/p/w185/${path}`
    : `https://eu.ui-avatars.com/api/?size=185&name=${name}`;

export function PersonItem(person: Person) {
  return (
    <>
      <img
        src={imgSrc(person.profile_path, person.name)}
        loading="lazy"
        alt={person.name}
      />
      <div className="details">
        <div>
          <div className="header">
            <h2>{person.name}</h2>
            <p>Person</p>
          </div>
          <p>{person.known_for_department}</p>
        </div>
        <p className="overview">
          {person.known_for.map((t) => t.original_title || t.name).join(', ')}
        </p>
      </div>
    </>
  );
}
