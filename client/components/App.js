const React = require('react');
const Login = require('./Login.js');
const Game = require('./game.js');
const gameLogic = require('../lib/gameLogic.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Login',
      currentUser: null,
      currentBankroll: null, // gets updated by Login component
    };
  }

  setAppState = (obj) => {
    this.setState(obj);
  }

  renderCurrentPage = () => {
    if (this.state.currentPage === 'Login') {
      return (
        <Login
          currentUser={this.state.currentUser}
          setAppState={this.setAppState}
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
  }

  render = () => (
    <div>
      <h1>Welcome to Blackjack</h1>
        {this.renderCurrentPage()}
    </div>
  );
}

module.exports = App;