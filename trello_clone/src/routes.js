import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Board from './components/Board/Board';
import Header from './components/Header/Header';

export default (
  <div>
    <Route path="/" component={Header}/>
    <Route exact path="/" component={Home}/>
    <Route path="/board/:id" component={Board}/>
  </div>
);

