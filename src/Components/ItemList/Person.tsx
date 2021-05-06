import React from 'react';
import { Person } from '../../types';
import { getImage, avatar } from '../../utils';

export function PersonItem(person: Person) {
  return (
    <>
      <img
        src={getImage(person.profile_path, '185', avatar(person.name, '185'))}
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
