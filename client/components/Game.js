const React = require('react');
const Dealer = require('./Dealer.js');
const Player = require('./Player.js');
const Footer = require('./Footer.js');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'inputting bet',
      dealerCards: ['10 of Spades', 'Q of Hearts'],
      playerCards: ['A of Hearts', 'J of Clubs'],
      deck: []
    };
  }

  updateGameState = (obj) => {
    this.setState(obj);
  }

  dealInitialCards = () => {
    let deck = this.props.gameLogic.getNewDeck();
    let playerCards = [];
    let dealerCards = [];
    deck = this.props.gameLogic.shuffle(deck);
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    this.setState({ playerCards, dealerCards, deck });

    // handle Blackjacks (player or dealer)
  }

  dealCardToDealer = () => {
    let dealerCards = [...this.state.dealerCards];
    let deck = [...this.state.deck];
    dealerCards.push(deck.pop());
    this.setState({ dealerCards, deck });
  }

  render = () => (
    <div>
      <Player
        cards={this.state.playerCards}
        deck={this.state.deck}
        gameStatus={this.state.gameStatus}
        gameLogic={this.props.gameLogic}
        currentUser={this.props.currentUser}
        currentBankroll={this.props.currentBankroll}
        updateAppState={this.props.updateAppState}
        updateGameState={this.updateGameState}
        dealInitialCards={this.dealInitialCards}
      />
      <Dealer
        cards={this.state.dealerCards}
        gameLogic={this.props.gameLogic}
        updateGameState={this.updateGameState}
      />
      <Footer 
        currentUser={this.props.currentUser}
        currentBankroll={this.props.currentBankroll}
        resultText={this.props.resultText}
      />
    </div>
  );
}

module.exports = Game;