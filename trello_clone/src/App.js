import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Modal from './components/Modal/Modal';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Modal />
      </div>
    );
  }
}

export default App;
