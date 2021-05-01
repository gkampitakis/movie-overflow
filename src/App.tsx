import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './Components/Search';
import PageNotFound from './Pages/PageNotFound';
import SearchResults from './Pages/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <Search />
      <Switch>
        <Route exact path="/search/:query" component={SearchResults} />
        <Route exact path="/" />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
