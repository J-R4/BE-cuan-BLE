import React from 'react'

import {
  Stock, Home, Watch, DetailStock
} from './pages/index.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/detailStock/:symbol">
          <DetailStock/>
        </Route>
        <Route path="/stock">
          <Stock/>
        </Route>
        <Route path="/watch">
          <Watch/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
