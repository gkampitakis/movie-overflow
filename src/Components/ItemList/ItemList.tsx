import React from 'react';
import { useHistory } from 'react-router-dom';
import { Person, Movie, Series } from '../../types';
import { PersonItem } from './Person';
import { TvItem } from './Tv';
import { MovieItem } from './Movie';
import './itemList.scss';

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
