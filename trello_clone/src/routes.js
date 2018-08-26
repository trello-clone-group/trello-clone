import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
//import AddBoard from './components/AddBoard/Board';
//import ChangeColor from './components/ChangeColor/ChangeColor';

export default (
  <div>
    <Route path="/" component={Header}/>
    <Route exact path="/" component={Home}/>
    <Route path="/board/:id" component={Board}/>
  </div>
);

