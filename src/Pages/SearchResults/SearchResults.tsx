import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { SearchResult, SearchResultsProps } from '../../types';
import { ItemList, Loader } from '../../Components';
import { searchRequest } from '../../Api';
import NoDataLogo from '../../assets/noData.svg';
import './searchResults.scss';

export default function SearchResults(props: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[] | undefined>();
  const listRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = props.match.params;
  const searchBy = props.location.state?.searchBy || 'all';

  const handleRequest = (page: number) => {
    setLoading(true);

    searchRequest(query, page, searchBy)
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
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const noData = () => {
    return (
      <article className="image_container no_results">
        <img src={NoDataLogo} alt="No results returned" />
        <p>No results found for &apos;{query}&apos;</p>
        <span>😭</span>
      </article>
    );
  };

  useEffect(() => {
    handleRequest(1);
  }, [query, searchBy]);

  return (
    <>
      <section className="main_content">
        <div ref={listRef} className="search_results">
          {results?.map((res) => (
            <ItemList item={res} key={res.id} />
          ))}
          {results && !results.length && noData()}
          <Loader loading={loading} />
        </div>
        {results && !!results.length && (
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => {
              listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              const page = selected + 1;
              setPage(page);
              handleRequest(page);
            }}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={page - 1}
          />
        )}
      </section>
    </>
  );
}
