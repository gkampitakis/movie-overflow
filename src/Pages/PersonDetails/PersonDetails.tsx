import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { PersonDetails } from '../../types';
import Placeholder from '../../assets/placeholder.jpeg';
import { Loader } from '../../Components';
import { getPerson } from '../../Api';
import './personDetails.scss';

const imgSrc = (path: string, width: '185' | '92') =>
  path ? `https://image.tmdb.org/t/p/w${width}${path}` : Placeholder;

export default function _PersonDetails(
  props: RouteComponentProps<{ id: string }>
) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = props.match.params;
  const [personDetails, setPersonDetails] = useState<PersonDetails>();

  const handleRequest = () => {
    setLoading(true);

    getPerson(id)
      .then((data) => {
        setPersonDetails(data);
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

  const goTo = (id: string, type: 'movie' | 'tv') => {
    history.push({
      pathname: `/${type}/${id}`
    });
  };

  useEffect(() => {
    handleRequest();
  }, [id]);

  return (
    <section className="person_details">
      {personDetails && (
        <>
          <div className="details">
            <header className="person_header">
              <h1>{personDetails.name}</h1>
              <p>{personDetails.known_for_department}</p>
            </header>
            <article className="overview">
              <img
                src={imgSrc(personDetails.profile_path, '185')}
                alt={personDetails.name}
              />
              <div>
                <p>{personDetails.biography}</p>
                <ul className="info">
                  <li>
                    <span>Birthday:</span> {personDetails.birthday}
                  </li>
                  {personDetails.deathday && (
                    <li>
                      <span>Deathday:</span> {personDetails.deathday}
                    </li>
                  )}
                  <li>
                    <span>Place of birth:</span> {personDetails.place_of_birth}
                  </li>
                  <li>
                    <span>Popularity:</span> {personDetails.popularity}
                  </li>
                </ul>
              </div>
            </article>
            {(!!personDetails.combined_credits.cast.length ||
              !!personDetails.combined_credits.crew.length) && (
              <>
                <hr />
                <h2 className="known_for">Known for:</h2>
                <article className="credits">
                  {personDetails.combined_credits.cast.map((elem) => {
                    const { id, media_type, poster_path, character } = elem;
                    const name = elem.original_title || elem.original_name;
                    return (
                      <div
                        className="item"
                        key={id}
                        onClick={() => goTo(id, media_type)}
                      >
                        <img
                          src={imgSrc(poster_path, '92')}
                          alt={name}
                          loading="lazy"
                        />
                        <div>
                          <h3>{name}</h3>
                          {character && <p>as {character}</p>}
                        </div>
                      </div>
                    );
                  })}
                  {personDetails.combined_credits.crew.map((elem) => {
                    const { id, media_type, poster_path, job } = elem;
                    const name = elem.original_title || elem.original_name;
                    return (
                      <div
                        className="item"
                        key={id}
                        onClick={() => goTo(id, media_type)}
                      >
                        <img
                          src={imgSrc(poster_path, '92')}
                          alt={name}
                          loading="lazy"
                        />
                        <div>
                          <h3>{name}</h3>
                          {job && <p>as {job}</p>}
                        </div>
                      </div>
                    );
                  })}
                </article>
              </>
            )}
          </div>
        </>
      )}
      <Loader loading={loading} />
    </section>
  );
}
