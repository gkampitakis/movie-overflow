import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchOptions, Suggestion } from '../../types';
import { searchRequest } from '../../Api';
import { Loader, RadioButton } from '../';
import './search.scss';

const DEBOUNCE_TIMER = 500;

function extractSuggestions(data: any[], option: SearchOptions): Suggestion[] {
  if (!data.length) return [];
  const random = Math.floor(Math.random() * data.length);

  return data.slice(random, random + 5).map((elem) => {
    const media_type = elem.media_type ? elem.media_type : option;
    let title = elem.original_title;
    if (media_type === 'tv') {
      title = elem.original_name;
    } else if (media_type === 'person') {
      title = elem.name;
    }

    return {
      id: elem.id,
      title,
      media_type
    };
  });
}

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [isHome, setIsHome] = useState(true);
  const [query, setQuery] = useState('');
  const [radioOption, setRadioOption] = useState<SearchOptions>('all');
  const [suggestions, setSuggestions] = useState<Suggestion[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (pathname === '/') {
      return setIsHome(true);
    }

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
    setSuggestions([]);
  };

  const handleRequest = () => {
    setLoading(true);

    searchRequest(query, 1, radioOption)
      .then((data) => {
        setSuggestions(extractSuggestions(data.results, radioOption));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioOption(e.target.value as SearchOptions);
  };

  const handleSearch = () => {
    if (!query) return;
    setSuggestions([]);

    history.push({
      pathname: `/search/${query}`,
      state: { searchBy: radioOption }
    });
  };

  const navigate = (pathname: string) => {
    setSuggestions([]);

    history.push({
      pathname
    });
  };

  const keyboardHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      return handleSearch();
    }

    if (e.key === 'Escape' || e.key === 'Esc') {
      setSuggestions([]);
    }
  };

  const returnHome = () => {
    navigate('/');
    setQuery('');
    setRadioOption('all');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length <= 5) {
      setSuggestions([]);
      return;
    }

    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      handleRequest();
    }, DEBOUNCE_TIMER);
  };

  return (
    <section className={`search_container ${isHome && 'home'}`}>
      <h1 onClick={returnHome}>Movie Overflow</h1>
      <div className="search">
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
        <div className="input_wrapper">
          <BsSearch
            type="submit"
            data-testid="search-icon"
            className="search_icon"
            onClick={handleSearch}
          />
          <input
            autoComplete="off"
            ref={inputRef}
            className="search_input"
            type="text"
            value={query}
            onKeyDown={keyboardHandler}
            onChange={handleInput}
            placeholder="Search..."
          />
          <IoMdClose
            data-testid="clear-icon"
            onClick={clearInput}
            className={`close_icon ${!!query && 'visible'}`}
          />
          {!!suggestions?.length && (
            <div className={`suggestions ${loading && 'loading'}`}>
              <Loader loading={loading} />
              {suggestions.map(({ media_type, id, title }) => (
                <div
                  onClick={() => navigate(`/${media_type}/${id}`)}
                  key={id}
                  className="item"
                >
                  <h3>{title}</h3>
                  <div className="type">{media_type}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
