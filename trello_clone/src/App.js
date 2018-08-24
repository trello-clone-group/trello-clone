import React, { Component } from 'react';
import './reset.css';
import './App.css';
import routes from './routes.js';
import Modal from './components/Modal/Modal';

class App extends Component {
  render() {
    return (
      <div className="App">
        { routes }
        <Modal />
      </div>
    );
  }
}

export default App;
