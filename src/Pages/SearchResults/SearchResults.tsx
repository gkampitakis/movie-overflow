import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { searchRequest } from '../../Api';
import { SearchOptions, SearchResult } from '../../types';
import ItemList from '../../Components/ItemList';
import ReactPaginate from 'react-paginate';
import './searchResults.scss';

type SearchResultsProps = RouteComponentProps<
  {
    query: string;
  },
  any,
  {
    searchBy: SearchOptions;
  }
>;

export default function SearchResults(props: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[] | undefined>();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const { query } = props.match.params;
  const { searchBy } = props.location.state;

  const handleRequest = (page: number) => {
    searchRequest<{
      results: SearchResult[];
      total_pages: number;
      page: number;
    }>(query, page, searchBy)
      .then((data) => {
        setPage(page);
        setPageCount(data.total_pages);
        setResults(
          data.results.map((res) => ({
            ...res,
            media_type: res.media_type ? res.media_type : (searchBy as any)
          }))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleRequest(1);
  }, [query, searchBy]);

  return (
    <>
      <section className="main_content">
        <div className="search_results">
          {results?.map((res) => (
            <ItemList item={res} key={res.id} />
          ))}
          {!results?.length && <span>Not results found for {query}</span>}
          {!results && <div>Loading...</div>}
        </div>
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => {
            const page = selected + 1;
            setPage(page);
            handleRequest(page);
          }}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={page - 1}
        />
      </section>
    </>
  );
}
