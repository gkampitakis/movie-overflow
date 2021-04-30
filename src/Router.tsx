import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Search from './Components/Search';

export default function Router() {
  return (
    <BrowserRouter>
      <Search />
      <Switch>{/* <Route path="/search" component={Home} /> */}</Switch>
    </BrowserRouter>
  );
}
