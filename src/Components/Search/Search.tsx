import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchOptions } from '../../types';
import './search.scss';

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [isHome, setIsHome] = useState(true);
  const [query, setQuery] = useState('');
  const [radioOption, setRadioOption] = useState<SearchOptions>('all');

  useEffect(() => {
    setIsHome(pathname === '/');

    const [, path, queryString] = pathname.split('/');
    if (path === 'search') {
      setQuery(queryString);
    }
  }, [pathname]);

  useEffect(() => {
    inputRef.current?.focus();
    handleSearch();
  }, []);

  const clearInput = () => {
    setQuery('');
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioOption(e.target.value as SearchOptions);
  };

  const handleSearch = () => {
    if (!query) return;

    history.push({
      pathname: `/search/${query}`,
      state: { searchBy: radioOption }
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
              type="radio"
              id="all"
              name="All"
              value="all"
              checked={radioOption === 'all'}
              onChange={handleRadioChange}
            />
            <label htmlFor="all">All</label>
          </div>
          <div>
            <input
              type="radio"
              id="movie"
              name="movie"
              value="movie"
              checked={radioOption === 'movie'}
              onChange={handleRadioChange}
            />
            <label htmlFor="Movie">Movies</label>
          </div>
          <div>
            <input
              type="radio"
              id="tv_series"
              name="Tv Series"
              value="tv"
              checked={radioOption === 'tv'}
              onChange={handleRadioChange}
            />
            <label htmlFor="tv_series">Tv Series</label>
          </div>
          <div>
            <input
              type="radio"
              id="person"
              name="Person"
              value="person"
              checked={radioOption === 'person'}
              onChange={handleRadioChange}
            />
            <label htmlFor="Person">People</label>
          </div>
        </div>
      </div>
    </section>
  );
}
