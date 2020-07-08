import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './views/404';
import Home from './views/Home';
import Game from './views/Game';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/game/:data" exact component={Game} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
