import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { PersonDetails } from '../../types';
import { Loader } from '../../Components';
import { getPerson } from '../../Api';
import './personDetails.scss';

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
          <div>Hello Person</div>
        </>
      )}
      <Loader loading={loading} />
    </section>
  );
}
