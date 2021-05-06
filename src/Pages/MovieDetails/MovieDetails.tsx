import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MovieDetails } from '../../types';
import { Loader } from '../../Components';
import { getMovie } from '../../Api';
import { avatar, getImage, openImage } from '../../utils';
import './movieDetails.scss';

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
              <h2>{movieDetails.original_title}</h2>
              <p>
                {movieDetails.genres.map((genre) => genre.name).join(', ') ||
                  'Unknown'}{' '}
                | {movieDetails.runtime} <AiOutlineClockCircle />
              </p>
            </header>
            <article className="overview">
              <img
                src={getImage(movieDetails.poster_path, '185')}
                alt={movieDetails.original_title}
              />
              <div>
                <p className="tagline">{movieDetails.tagline}</p>
                <p>{movieDetails.overview}</p>
              </div>
            </article>
            <article className="general">
              <div>
                <h3>{movieDetails.status}</h3>
                <p>{movieDetails.release_date}</p>
              </div>
              <div>
                <h3>Vote: </h3>
                <p>{movieDetails.vote_average} ✨</p>
              </div>
            </article>
            {!!movieDetails.images.posters.length && (
              <>
                <hr />
                <h2 className="title">Photos</h2>
                <article className="photos">
                  {movieDetails.images.posters.slice(0, 7).map((image, idx) => (
                    <img
                      onClick={() => openImage(image.file_path)}
                      key={idx}
                      src={getImage(image.file_path, '92')}
                      alt={movieDetails.original_title}
                    />
                  ))}
                </article>
              </>
            )}
            {(!!movieDetails.credits.cast.length ||
              !!movieDetails.credits.cast.length) && (
              <>
                <h2 className="title">Credits</h2>
                <div className="credits">
                  {movieDetails.credits.cast.map((person) => (
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
                  {movieDetails.credits.crew.map((person) => (
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
