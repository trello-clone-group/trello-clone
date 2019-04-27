import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import Modal from './components/Modal/Modal';
//import AddBoard from './components/AddBoard/Board';
//import ChangeColor from './components/ChangeColor/ChangeColor';

export default (
  <div>
    <Route path="/" component={Header}/>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Home}/>
    <Route path="/board/:id" component={Board}/>
    <Route path="/" component={Modal}/>
  </div>
);

