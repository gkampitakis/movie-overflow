import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchOptions } from '../../types';
import RadioButton from '../RadioButton';
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
          <RadioButton
            name="All"
            value="all"
            checked={radioOption}
            onClick={handleRadioChange}
          />
          <RadioButton
            name="Movie"
            value="movie"
            checked={radioOption}
            onClick={handleRadioChange}
          />
          <RadioButton
            name="Tv Series"
            value="tv"
            checked={radioOption}
            onClick={handleRadioChange}
          />
          <RadioButton
            name="People"
            value="person"
            checked={radioOption}
            onClick={handleRadioChange}
          />
        </div>
      </div>
    </section>
  );
}
