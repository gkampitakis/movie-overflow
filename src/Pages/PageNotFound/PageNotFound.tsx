import React from 'react';
import NotFoundLogo from '../../assets/404.svg';

export default function PageNotFound() {
  return (
    <section className="main_content image_container">
      <img src={NotFoundLogo} alt="Page not found" />
    </section>
  );
}
