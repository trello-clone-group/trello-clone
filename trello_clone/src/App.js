import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Board/>
      </div>
    );
  }
}

export default App;
