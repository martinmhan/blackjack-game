const React = require('react');
const Dealer = require('./Dealer.js');
const Player = require('./Player.js');
const ControlPad = require('./ControlPad.js');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'inputting bet',
      dealerCards: ['10 of Spades', 'Q of Hearts'],
      playerCards: ['A of Hearts', 'J of Clubs'],
      deck: [],
      betAmount: null,
      resultText: 'test!'
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
    this.setState({ playerCards, dealerCards, deck }, handleBlackjack);
  }

  dealCardToDealer = () => {
    let dealerCards = [...this.state.dealerCards];
    let deck = [...this.state.deck];
    dealerCards.push(deck.pop());
    this.setState({ dealerCards, deck });
  }

  handleBlackjack = () => {
    if (this.props.gameLogic.hasBlackjack(this.state.playerCards) || this.props.gameLogic.hasBlackjack(this.state.dealerCards)) {
      console.log('blackjack!');
    }
  }

  handlePlayerHit = () => {
    let playerCards = [...this.props.playerCards];
    let deck = [...this.props.deck];
    playerCards.push(deck.pop());
    this.setState({ playerCards, deck });
    this.props.updateGameState({ playerCards, deck }, this.handlePlayerBust);
  };

  handlePlayerBust = () => {
    if (Math.min(this.state.handTotal) > 21) {
      this.props.updateAppState({
        resultText: 'Player busted!',
        currentBankroll: this.props.currentBankroll - this.state.betAmount
      });
    }
  }

  handlePlayerStay = () => {
    console.log('Player stays!');
  }

  handleQuitGame = () => {
    this.props.updateAppState({ currentPage: 'Login' });
  }

  handleResetBankroll = () => {
    this.props.updateAppState({ currentBankroll: 1000 });
  }

  render = () => (
    <div>
      <Dealer
        cards={this.state.dealerCards}
      />
      <Player
        cards={this.state.playerCards}
        currentBankroll={this.props.currentBankroll}
      />
      <ControlPad
        resultText={this.props.resultText}
        currentUser={this.props.currentUser}
        updateAppState={this.props.updateAppState}
        currentBankroll={this.props.currentBankroll}
        deck={this.state.deck}
        gameStatus={this.state.gameStatus}
        playerCards={this.state.playerCards}
        updateGameState={this.updateGameState}
        dealInitialCards={this.dealInitialCards}
        handleResetBankroll={this.handleResetBankroll}
        handleQuitGame={this.handleQuitGame}
        handlePlayerStay={this.handlePlayerStay}
      />
    </div>
  );
}

module.exports = Game;