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
    tv: PersonItem,
    person: TvItem
  };

  return items[props.item.media_type](props.item as any);
}

function PersonItem(actor: Actor) {
  return <article className="item_list">{actor.id}</article>;
}

function TvItem(actor: Series) {
  return <article className="item_list">{actor.id}</article>;
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
