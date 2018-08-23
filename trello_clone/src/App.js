import React, { Component } from "react";

// Style Imports
import "./App.css";
import "./reset.css";

// Component Imports
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import Board from "./components/Board/Board";
import Auth from "./components/Auth/Auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Header />
        <Modal />
        <Board />
        <Auth />
      </div>
    );
  }
}

export default App;
