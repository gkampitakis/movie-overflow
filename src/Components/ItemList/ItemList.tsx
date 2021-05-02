import React from 'react';
import { Person, Movie, Series } from '../../types';
import NotFound from '../../assets/404.svg';
import './itemList.scss';
import { RouteComponentProps, useHistory } from 'react-router-dom';

// TODO: we might need to break this

interface ItemListProps {
  item: Person | Movie | Series;
}

export default function ItemList(props: ItemListProps) {
  const history = useHistory();
  const items = {
    movie: MovieItem,
    tv: TvItem,
    person: PersonItem
  };

  const goTo = (id: string, type: 'person' | 'movie' | 'tv') => {
    history.push({
      pathname: `/${type}/${id}`
    });
  };

  return (
    <article
      className="item_list"
      onClick={() => goTo(props.item.id, props.item.media_type)}
    >
      {items[props.item.media_type](props.item as any)}
    </article>
  );
}

function PersonItem(person: Person) {
  const src = person.profile_path
    ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
    : NotFound;

  return (
    <>
      <img src={src} loading="lazy" alt={person.name} />
      <div className="details">
        <div>
          <h2>{person.name}</h2>
          <p>{person.known_for_department}</p>
        </div>
        <p className="overview">
          {person.known_for.map((t) => t.original_title).join('*')}
        </p>
      </div>
    </>
  );
}

function TvItem(tv: Series) {
  const src = tv.poster_path
    ? `https://image.tmdb.org/t/p/w185/${tv.poster_path}`
    : NotFound;

  return (
    <>
      <img src={src} loading="lazy" alt={tv.name} />
      <div className="details">
        <div>
          <h2>{tv.original_name}</h2>
          <p>{tv.first_air_date}</p>
        </div>
        <p className="overview">{tv.overview}</p>
      </div>
    </>
  );
}

function MovieItem(movie: Movie) {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : NotFound;

  return (
    <>
      <img src={src} loading="lazy" alt={movie.original_title} />
      <div className="details">
        <div>
          <h2>{movie.original_title}</h2>
          <p>{movie.release_date}</p>
        </div>
        <p className="overview">{movie.overview}</p>
      </div>
    </>
  );
}
