import Placeholder from './assets/placeholder.jpeg';

export const getImage = (
  path: string,
  width: '185' | '92',
  placeholder = Placeholder
) => (path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholder);

export const avatar = (name: string, size: string) =>
  `https://eu.ui-avatars.com/api/?size=${size}&name=${name}`;

export const openImage = (path: string) =>
  window.open(`https://image.tmdb.org/t/p/original${path}`, '_blank');
