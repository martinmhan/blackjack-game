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
      currentBankroll: null,
      resultText:'test!'
    };
  }

  renderCurrentPage = () => {
    switch (this.state.currentPage) {
      case 'Login':
        return (<Login currentUser={this.state.currentUser} updateAppState={this.updateAppState} />);
        break;
      case 'Game':
        return (<Game 
          currentUser={this.state.currentUser}
          currentBankroll={this.state.currentBankroll}
          updateAppState={this.updateAppState}
          gameLogic={gameLogic} 
          />);
        break;
      default:
        break;
    }
  }

  updateAppState = (obj) => {
    this.setState(obj);
  }

  render = () => (
    <div>
      <h1>Welcome to Blackjack</h1>
        {this.renderCurrentPage()}
    </div>
  );
}

module.exports = App;