import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
//import AddBoard from './components/AddBoard/Board';
//import ChangeColor from './components/ChangeColor/ChangeColor';

export default (
  <div>
    <Route exact path="/" component={Auth} />
    <Route path="/Boards" component={Home} />
    <Route path="/board/:id" component={Board} />
  </div>
);
