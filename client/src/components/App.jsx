import React, { Component } from 'react';
import Login from './Login.jsx';
import Game from './Game.jsx';
import gameLogic from '../lib/gameLogic.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Login',
      currentUser: null,
      currentBankroll: null
    };
  }

  setAppState = (obj, callback) => {
    this.setState(obj, callback);
  };

  renderCurrentPage = () => {
    if (this.state.currentPage === 'Login') {
      return (
        <Login
          currentUser={this.state.currentUser}
          setAppState={this.setAppState}
          getUser={this.getUser}
        />);
    } else if (this.state.currentPage === 'Game') {
      return (
        <Game
          currentUser={this.state.currentUser}
          currentBankroll={this.state.currentBankroll}
          setAppState={this.setAppState}
          gameLogic={gameLogic} 
        />);
    }
  };

  render = () => (
    <div id="app">
      <div id="appheader">Welcome to Blackjack</div>
      {this.renderCurrentPage()}
    </div>
  );
}

export default App;
