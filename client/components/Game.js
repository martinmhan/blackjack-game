const React = require('react');
const axios = require('axios');
const Dealer = require('./Dealer.js');
const Player = require('./Player.js');
const ControlPad = require('./ControlPad.js');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'inputting bet',
      resultText: '',
      dealerCards: [],
      playerCards: [],
      deck: [],
      betAmount: null
    };
  }

  // TODO
    // fix user bankroll not updating in DB
    // fix multiple identical username entries in DB collection

  // setGameState = (obj) => {
  //   this.setState(obj);
  // }

  saveUserBankroll = () => {
    console.log(`about to save user bankroll for ${this.props.currentUser} for $${this.props.currentBankroll}`);
    axios.put('/api/user', {
      username: this.props.currentUser,
      bankroll: this.props.currentBankroll
    });
  }

  handleBetSubmit = (event) => {
    event.preventDefault();
    let betAmount = parseInt(document.getElementById('betamount').value);
    if (betAmount <= 0 || betAmount > this.props.currentBankroll) {
      alert('Please enter a valid bet amount.');
    } else {
      this.setState({
        betAmount,
        gameStatus: 'bet submitted',
        resultText: '',
        dealerCards: [],
        playerCards: []
      });
    }
  };

  handleDeal = () => {
    let deck = this.props.gameLogic.getNewDeck();
    let playerCards = [];
    let dealerCards = [];
    deck = this.props.gameLogic.shuffle(deck);
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    this.setState({ playerCards, dealerCards, deck, gameStatus:'in play' }, this.handleBlackjack);
  }

  handleBlackjack = () => {
    if (this.hasBlackjack(this.state.playerCards) || this.hasBlackjack(this.state.dealerCards)) {
      console.log('blackjack!');
      // TODO
    }
  }

  hasBlackjack = (cards) => (
    this.props.gameLogic.getHandTotal(cards).includes(21)
  );

  handlePlayerHit = () => {
    let playerCards = [...this.state.playerCards];
    let deck = [...this.state.deck];
    playerCards.push(deck.pop());
    this.setState({ playerCards, deck });
    this.setState({ playerCards, deck }, this.handlePlayerBust);
  };

  handlePlayerBust = () => {
    const playerHandTotal = this.props.gameLogic.getHandTotal(this.state.playerCards);
    if (Math.min(...playerHandTotal) > 21) {
      document.getElementById('betamount').value = 0;
      this.setState({
        resultText: 'Player busted!',
        gameStatus: 'inputting bet'
      }, () => {
        this.props.setAppState({
          currentBankroll: this.props.currentBankroll - this.state.betAmount
        }, this.saveUserBankroll);
      });
    }
  }

  handlePlayerStay = () => {
    console.log('handlePlayerStay invoked');
    let dealerCards = [...this.state.dealerCards];
    let deck = [...this.state.deck];
    let dealerHandTotal = this.props.gameLogic.getHandTotal(this.state.dealerCards);
    let playerHandTotal = this.props.gameLogic.getHandTotal(this.state.playerCards);
    let newBankroll, newResultText;

    while (Math.min(dealerHandTotal) <= 17) {
      dealerCards.push(deck.pop());
      dealerHandTotal = this.props.gameLogic.getHandTotal(dealerCards);
    }

    if (dealerHandTotal.length === 1 || dealerHandTotal[1] > 21) { dealerHandTotal = dealerHandTotal[0]; }
    else { dealerHandTotal = dealerHandTotal[1]; }

    if (playerHandTotal.length === 1 || playerHandTotal[1] > 21) { playerHandTotal = playerHandTotal[0]; }
    else { playerHandTotal = playerHandTotal[1]; }

    if (dealerHandTotal > 21) {
      newBankroll = this.props.currentBankroll + this.state.betAmount;
      newResultText = 'Dealer busted!';
    } else if (playerHandTotal === dealerHandTotal) {
      newBankroll = this.props.currentBankroll;
      newResultText = 'It\'s a push!';
    } else if (playerHandTotal > dealerHandTotal) {
      newBankroll = this.props.currentBankroll + this.state.betAmount;
      newResultText = 'Player wins!';
    } else {
      newBankroll = this.props.currentBankroll - this.state.betAmount;
      newResultText = 'Dealer wins!';
    }

    this.setState({ dealerCards, deck, resultText: newResultText, gameStatus: 'inputting bet' }, () => {
      this.props.setAppState({ currentBankroll: newBankroll }, this.saveUserBankroll);
    });
  }

  handleQuitGame = () => {
    this.props.setAppState({ currentPage: 'Login' }, this.saveUserBankroll);
  }

  handleResetBankroll = () => {
    this.props.setAppState({ currentBankroll: 1000 }, this.saveUserBankroll);
    // TODO?
  }
p
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
        currentBankroll={this.props.currentBankroll}
        resultText={this.state.resultText}
        gameStatus={this.state.gameStatus}
        betAmount={this.state.betAmount}
        handleBetSubmit={this.handleBetSubmit}
        handleDeal={this.handleDeal}
        handlePlayerHit={this.handlePlayerHit}
        handlePlayerStay={this.handlePlayerStay}
        handleQuitGame={this.handleQuitGame}
        handleResetBankroll={this.handleResetBankroll}
      />
    </div>
  );
}

module.exports = Game;