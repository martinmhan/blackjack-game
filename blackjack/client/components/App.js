const React = require('react');
const Login = require('./Login.js');
const Game = require('./game.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Login',
      currentUser: null,
      currentBankroll: null
    };
  }

  renderCurrentPage = () => {
    switch (this.state.currentPage) {
      case 'Login':
        return (<Login currentUser={this.state.currentUser} updateState={this.updateState} />);
        break;
      case 'Game':
        return (<Game currentUser={this.state.currentUser} currentBankroll={this.state.currentBankroll} gameLogic = {this.props.gameLogic} />);
        break;
      default:
        break;
    }
  }

  updateState = (obj) => {
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