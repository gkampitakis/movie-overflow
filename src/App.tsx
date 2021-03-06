import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './Components/Search';
import {
  PageNotFound,
  SearchResults,
  PersonDetails,
  MovieDetails,
  TvSeriesDetails
} from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Search />
      <Switch>
        <Route exact path="/search/:query" component={SearchResults} />
        <Route exact path="/person/:id" component={PersonDetails} />
        <Route exact path="/tv/:id" component={TvSeriesDetails} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/" />
        <Route exact path="/notFound" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
