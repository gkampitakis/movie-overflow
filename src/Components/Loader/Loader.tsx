import React from 'react';
import './loader.scss';

export default function Loader({ loading }: { loading: boolean }) {
  return loading ? <div data-testid="loader" className="loader"></div> : null;
}
