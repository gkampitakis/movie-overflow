import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import './search.scss';

export default function Search() {
  const [isHome, setIsHome] = useState(true);
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState({
    actors: true,
    movies: true,
    series: true
  });
  const clearInput = () => {
    setValue('');
    setIsHome(true);
  };

  const handleFiltersChange = (field: 'actors' | 'movies' | 'series') => {
    setFilters((filters) => ({ ...filters, [field]: !filters[field] }));
  };

  const search = () => {
    if (!value) return;
    setIsHome(false);
    console.log('close');
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <section className={`search_container ${isHome && 'home'}`}>
      <h1>Movie Overflow</h1>
      <div className="search">
        <BsSearch type="submit" className="search_icon" onClick={search} />
        <input
          className="search_input"
          type="text"
          value={value}
          onKeyDown={enterHandler}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
        <IoMdClose
          onClick={clearInput}
          className={`close_icon ${!!value && 'visible'}`}
        />

        <div className="filters">
          <div>
            <input
              type="checkbox"
              id="movie"
              name="Movie"
              defaultChecked={filters.movies}
              onChange={() => handleFiltersChange('movies')}
            />
            <label htmlFor="Movie">Movie</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="tv_series"
              name="Tv Series"
              defaultChecked={filters.series}
              onChange={() => handleFiltersChange('series')}
            />
            <label htmlFor="tv_series">Tv Series</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="actor"
              name="Actor"
              defaultChecked={filters.actors}
              onChange={() => handleFiltersChange('actors')}
            />
            <label htmlFor="Actor">Actor</label>
          </div>
        </div>
      </div>
    </section>
  );
}
