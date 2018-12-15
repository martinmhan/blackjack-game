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

  hasBlackjack = (cards) => (
    this.props.gameLogic.getHandTotal(cards).includes(21)
  );

  dealInitialCards = () => {
    let deck = this.props.gameLogic.getNewDeck();
    let playerCards = [];
    let dealerCards = [];
    deck = this.props.gameLogic.shuffle(deck);
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    this.setState({ playerCards, dealerCards, deck }, this.handleBlackjack);
  }

  handleDealerTurn = () => {
    let dealerCards = [...this.state.dealerCards];
    let deck = [...this.state.deck];
    let dealerHandTotal = this.props.gameLogic.getHandTotal(this.state.dealerCards);
    while (Math.min(dealerHandTotal) <= 17) {
      dealerCards.push(deck.pop());
    }
    this.setState({ dealerCards, deck }, () => {
      // TODO
    });
  }

  handleBlackjack = () => {
    if (this.hasBlackjack(this.state.playerCards) || this.hasBlackjack(this.state.dealerCards)) {
      console.log('blackjack!');
      // TODO
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
    const playerHandTotal = this.props.gameLogic.getHandTotal(this.state.playerCards);
    if (Math.min(playerHandTotal) > 21) {
      this.props.updateAppState({
        resultText: 'Player busted!',
        currentBankroll: this.props.currentBankroll - this.state.betAmount
      });
    }
  }

  handlePlayerStay = () => {
    console.log('Player stays!');
    // TO DO
  }

  handleQuitGame = () => {
    this.props.updateAppState({ currentPage: 'Login' });
  }

  handleResetBankroll = () => {
    this.props.updateAppState({ currentBankroll: 1000 });
    // TODO?
  }

  handleBetSubmit = () => {
    let betAmount = document.getElementById('betamount').value;
    if (betAmount <= 0) {
      alert('Please enter a valid bet amount.');
    } else {
      this.setState({ betAmount , gameStatus: 'bet submitted' });
    }
  };

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
        dealInitialCards={this.dealInitialCards}
        handleResetBankroll={this.handleResetBankroll}
        handleQuitGame={this.handleQuitGame}
        handlePlayerStay={this.handlePlayerStay}
        handleBetSubmit={this.handleBetSubmit}
      />
    </div>
  );
}

module.exports = Game;