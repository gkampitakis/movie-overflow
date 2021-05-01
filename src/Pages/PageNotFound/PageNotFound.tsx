import React from 'react';
import NotFoundLogo from '../../assets/404.svg';
import './pageNotFound.scss';

export default function PageNotFound() {
  return (
    <section className="main_content page_not_found">
      <img src={NotFoundLogo} alt="Page not found" />
    </section>
  );
}
