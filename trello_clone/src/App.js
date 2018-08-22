import React, { Component } from 'react';
import './reset.css';
import Modal from './components/Modal/Modal';
import Home from './components/Home/Home';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Modal />
        <Header/>
        <Board/>
      </div>
    );
  }
}

export default App;
