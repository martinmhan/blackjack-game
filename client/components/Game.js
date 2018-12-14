const React = require('react');
const Dealer = require('./Dealer.js');
const Player = require('./Player.js');
const Footer = require('./Footer.js');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGameState: null, // player move, 
      dealercards: ['10 of Spades', 'Q of Hearts'],
      playercards: ['A of Hearts', 'J of Clubs'],
      deck: [],
      pot: null
    };
  }

  render = () => (
    <div>
      <Player
        cards={this.state.playercards}
        gameLogic={this.props.gameLogic}
        
        currentBankroll={this.props.currentBankroll}
        currentGameState={this.state.currentGameState}
      />
      <Dealer
        cards={this.state.dealercards}
        gameLogic={this.props.gameLogic}
      />
      <Footer currentUser={this.props.currentUser} currentBankroll={this.props.currentBankroll} />
    </div>
  );
}

module.exports = Game;