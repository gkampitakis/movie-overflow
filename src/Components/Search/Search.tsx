import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import './search.scss';

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [isHome, setIsHome] = useState(true);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    actors: true,
    movies: true,
    series: true
  });
  const enabledInput = filters.actors || filters.movies || filters.series;

  useEffect(() => {
    setIsHome(pathname === '/');

    const [, path, queryString] = pathname.split('/');
    if (path === 'search') {
      setQuery(queryString);
    }
  }, [pathname]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearInput = () => {
    setQuery('');
  };

  const handleFiltersChange = (field: 'actors' | 'movies' | 'series') => {
    setFilters((filters) => ({ ...filters, [field]: !filters[field] }));
  };

  const handleSearch = () => {
    if (!query || !enabledInput) return;

    history.push({
      pathname: `/search/${query}`,
      state: { filters }
    });
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={`search_container ${isHome && 'home'}`}>
      <h1>Movie Overflow</h1>
      <div className="search">
        <BsSearch
          type="submit"
          className="search_icon"
          onClick={handleSearch}
        />
        <input
          ref={inputRef}
          disabled={!enabledInput}
          className="search_input"
          type="text"
          value={query}
          onKeyDown={enterHandler}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <IoMdClose
          onClick={clearInput}
          className={`close_icon ${!!query && 'visible'}`}
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
