import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { TvSeriesDetails } from '../../types';
import { Loader } from '../../Components';
import { getTvSeries } from '../../Api';
import { avatar, getImage } from '../../utils';
import './tvSeriesDetails.scss';

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
              <h2>{tvSeriesDetails.original_name}</h2>
              <p>
                {tvSeriesDetails.genres.map((genre) => genre.name).join(', ') ||
                  'Unknown'}
              </p>
            </header>
            <article className="overview">
              <img
                src={getImage(tvSeriesDetails.poster_path, '185')}
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
                <h2 className="title">Seasons</h2>
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
                        src={getImage(season.poster_path, '92')}
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
            {(!!tvSeriesDetails.credits.cast.length ||
              !!tvSeriesDetails.credits.crew.length) && (
              <>
                <h2 className="title">Credits</h2>
                <div className="credits">
                  {tvSeriesDetails.credits.cast.map((person) => (
                    <div
                      className="item"
                      onClick={() => goTo(person.id)}
                      key={person.id}
                    >
                      <img
                        loading="lazy"
                        src={getImage(
                          person.profile_path,
                          '92',
                          avatar(person.original_name, '92')
                        )}
                        alt={person.original_name}
                      />
                      <div>
                        <h3>{person.original_name}</h3>
                        <p>as {person.character}</p>
                      </div>
                    </div>
                  ))}
                  {tvSeriesDetails.credits.crew.map((person) => (
                    <div
                      className="item"
                      onClick={() => goTo(person.id)}
                      key={person.id}
                    >
                      <img
                        loading="lazy"
                        src={getImage(
                          person.profile_path,
                          '92',
                          avatar(person.original_name, '92')
                        )}
                        alt={person.original_name}
                      />
                      <div>
                        <h3>{person.original_name}</h3>
                        <p>{person.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
      <Loader loading={loading} />
    </section>
  );
}
