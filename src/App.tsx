import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './Components/Search';
import SearchResults from './Pages/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <Search />
      <Switch>
        <Route path="/search/:query" component={SearchResults} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
