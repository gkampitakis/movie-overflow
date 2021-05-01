import React from 'react';
import { Actor, Movie, Series } from '../../types';
import NotFound from '../../assets/404.svg';
import './itemList.scss';

interface ItemListProps {
  item: Actor | Movie | Series;
}

export default function ItemList(props: ItemListProps) {
  const items = {
    movie: MovieItem,
    tv: TvItem,
    person: PersonItem
  };

  return items[props.item.media_type](props.item as any);
}

function PersonItem(actor: Actor) {
  const src = actor.profile_path
    ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
    : NotFound;

  return (
    <article className="item_list">
      <img src={src} alt={actor.name} />
      <div className="details">
        <div>
          <h2>{actor.name}</h2>
          <p>{actor.known_for_department}</p>
        </div>
        <p className="overview">
          {actor.known_for.map((t) => t.original_title).join('*')}
        </p>
      </div>
    </article>
  );
}

function TvItem(tv: Series) {
  const src = tv.poster_path
    ? `https://image.tmdb.org/t/p/w185/${tv.poster_path}`
    : NotFound;

  return (
    <article className="item_list">
      <img src={src} alt={tv.name} />
      <div className="details">
        <div>
          <h2>{tv.original_name}</h2>
          <p>{tv.first_air_date}</p>
        </div>
        <p className="overview">{tv.overview}</p>
      </div>
    </article>
  );
}

function MovieItem(movie: Movie) {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : NotFound;

  return (
    <article className="item_list">
      <img src={src} alt={movie.original_title} />
      <div className="details">
        <div>
          <h2>{movie.original_title}</h2>
          <p>{movie.release_date}</p>
        </div>
        <p className="overview">{movie.overview}</p>
      </div>
    </article>
  );
}
