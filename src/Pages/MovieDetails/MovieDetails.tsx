import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Placeholder from '../../assets/placeholder.jpeg';
import { MovieDetails } from '../../types';
import { Loader } from '../../Components';
import { getMovie } from '../../Api';
import './movieDetails.scss';

const imgSrc = (path: string, width: '185' | '92') =>
  path ? `https://image.tmdb.org/t/p/w${width}${path}` : Placeholder;
const openImage = (path: string) =>
  window.open(`https://image.tmdb.org/t/p/original${path}`, '_blank');

export default function _MovieDetails(
  props: RouteComponentProps<{ id: string }>
) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = props.match.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  const handleRequest = () => {
    setLoading(true);

    getMovie(id)
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return history.push({
            pathname: '/notFound'
          });
        }
        console.error(error);
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
    <section className="movie_details">
      {movieDetails && (
        <>
          <div className="details">
            <header>
              <h1>{movieDetails.original_title}</h1>
              <p>
                {movieDetails.genres.map((genre) => genre.name).join(', ') ||
                  'Unknown'}{' '}
                | {movieDetails.runtime} <AiOutlineClockCircle />
              </p>
            </header>
            <article className="overview">
              <img
                src={imgSrc(movieDetails.poster_path, '185')}
                alt={movieDetails.original_title}
              />
              <div>
                <p className="tagline">{movieDetails.tagline}</p>
                <p>{movieDetails.overview}</p>
              </div>
            </article>
            <article className="general">
              <div className="released">
                <h3>{movieDetails.status}</h3>
                <p>{movieDetails.release_date}</p>
              </div>
              <div className="statistics">
                <p>Vote: {movieDetails.vote_average} ✨</p>
              </div>
            </article>
            {!!movieDetails.images.posters.length && (
              <>
                <hr />
                <h2 className="photos_title">Photos</h2>
                <article className="photos">
                  {movieDetails.images.posters.slice(0, 7).map((image, idx) => (
                    <img
                      onClick={() => openImage(image.file_path)}
                      key={idx}
                      src={imgSrc(image.file_path, '92')}
                      alt={movieDetails.original_title}
                    />
                  ))}
                </article>
              </>
            )}
          </div>
          {(!!movieDetails.credits.cast.length ||
            !!movieDetails.credits.cast.length) && (
            <div className="credits">
              {!!movieDetails.credits.cast.length && <h2>Cast</h2>}
              {movieDetails.credits.cast.map((person) => (
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
              {!!movieDetails.credits.crew.length && <h2>Crew</h2>}
              {movieDetails.credits.crew.map((person) => (
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
