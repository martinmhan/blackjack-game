const React = require('react');
const Login = require('./Login.jsx');
const Game = require('./Game.jsx');
const gameLogic = require('../lib/gameLogic.js');

class App extends React.Component {
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
    <div>
      <h1>Welcome to Blackjack</h1>
        {this.renderCurrentPage()}
    </div>
  );
}

module.exports = App;