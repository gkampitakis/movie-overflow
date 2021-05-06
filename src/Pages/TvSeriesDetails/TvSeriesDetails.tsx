import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { TvSeriesDetails } from '../../types';
import Placeholder from '../../assets/placeholder.jpeg';
import { Loader } from '../../Components';
import { getTvSeries } from '../../Api';
import './tvSeriesDetails.scss';

const imgSrc = (path: string, width: '185' | '92') =>
  path ? `https://image.tmdb.org/t/p/w${width}${path}` : Placeholder;

export default function _TvSeriesDetails(
  props: RouteComponentProps<{ id: string }>
) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = props.match.params;
  const [tvSeriesDetails, setTvSeriesDetails] = useState<TvSeriesDetails>();
  const [selectedSeason, setSelectedSeason] = useState(0);

  const handleRequest = () => {
    setLoading(true);

    getTvSeries(id)
      .then((data) => {
        setTvSeriesDetails(data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return history.push({
            pathname: '/notFound'
          });
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false));
  };

  const goTo = (id: string) => {
    history.push({
      pathname: `/person/${id}`
    });
  };

  useEffect(() => {
    handleRequest();
  }, [id]);

  return (
    <section className="tv_series_details">
      {tvSeriesDetails && (
        <>
          <div className="details">
            <header className="tv_header">
              <h1>{tvSeriesDetails.original_name}</h1>
              <p>
                {tvSeriesDetails.genres.map((genre) => genre.name).join(', ') ||
                  'Unknown'}
              </p>
            </header>
            <article className="overview">
              <img
                src={imgSrc(tvSeriesDetails.poster_path, '185')}
                alt={tvSeriesDetails.original_name}
              />
              <div>
                {tvSeriesDetails.tagline && (
                  <p className="tagline">{tvSeriesDetails.tagline}</p>
                )}
                <p>{tvSeriesDetails.overview}</p>
              </div>
            </article>
            <article className="general">
              <div className="released">
                <div>
                  <h3>Status:</h3>
                  <p>{tvSeriesDetails.status}</p>
                </div>
                <div>
                  <h3>Started:</h3>
                  <p>{tvSeriesDetails.first_air_date}</p>
                </div>
                <div>
                  {tvSeriesDetails.last_air_date && (
                    <>
                      <h3>Finished:</h3> <p>{tvSeriesDetails.last_air_date}</p>
                    </>
                  )}
                </div>
                <div>
                  <h3>Seasons: </h3>
                  <p>{tvSeriesDetails.number_of_seasons}</p>
                </div>
                <div>
                  <h3>Vote: </h3>
                  <p>{tvSeriesDetails.vote_average} ✨</p>
                </div>
              </div>
            </article>
            {!!tvSeriesDetails.seasons.length && (
              <>
                <hr />
                <h2 className="seasons_title">Seasons</h2>
                <article className="seasons">
                  {tvSeriesDetails.seasons.map((season, idx) => (
                    <div
                      onClick={() => setSelectedSeason(idx)}
                      className={`season ${
                        idx === selectedSeason && 'selected'
                      }`}
                      key={season.id}
                    >
                      <img
                        src={imgSrc(season.poster_path, '92')}
                        alt={season.name}
                      />
                    </div>
                  ))}
                </article>
                <article className="season_details">
                  <h2>
                    {tvSeriesDetails.seasons[selectedSeason].name} | Episodes:{' '}
                    {tvSeriesDetails.seasons[selectedSeason].episode_count}
                  </h2>
                  <p>{tvSeriesDetails.seasons[selectedSeason].overview}</p>
                </article>
              </>
            )}
          </div>
          {(!!tvSeriesDetails.credits.cast.length ||
            !!tvSeriesDetails.credits.crew.length) && (
            <div className="credits">
              {!!tvSeriesDetails.credits.cast.length && <h2>Cast</h2>}
              {tvSeriesDetails.credits.cast.map((person) => (
                <div onClick={() => goTo(person.id)} key={person.id}>
                  <div className="avatar">
                    <img
                      loading="lazy"
                      src={
                        person.profile_path
                          ? imgSrc(person.profile_path, '185')
                          : `https://eu.ui-avatars.com/api/?size=185&name=${person.original_name}`
                      }
                      alt={person.original_name}
                    />
                  </div>
                  <h3>{person.original_name}</h3>
                  <p>as {person.character}</p>
                </div>
              ))}
              {!!tvSeriesDetails.credits.crew.length && <h2>Crew</h2>}
              {tvSeriesDetails.credits.crew.map((person) => (
                <div onClick={() => goTo(person.id)} key={person.id}>
                  <div className="avatar">
                    <img
                      loading="lazy"
                      src={
                        person.profile_path
                          ? imgSrc(person.profile_path, '185')
                          : `https://eu.ui-avatars.com/api/?size=185&name=${person.original_name}`
                      }
                      alt={person.original_name}
                    />
                  </div>
                  <h3>{person.original_name}</h3>
                  <p>{person.job}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Loader loading={loading} />
    </section>
  );
}
