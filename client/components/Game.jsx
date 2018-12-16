const React = require('react');
const axios = require('axios');
const Dealer = require('./Dealer.jsx');
const Player = require('./Player.jsx');
const ControlPad = require('./ControlPad.jsx');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'inputting bet', // possible values; 'inputting bet', 'bet submitted', 'in play'
      resultText: '',
      dealerCards: [],
      playerCards: [],
      deck: [],
      betAmount: null
    };
  }

  saveUserBankroll = () => {
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
    let newBankroll, newResultText;
    if (this.hasBlackjack(this.state.playerCards) && this.hasBlackjack(this.state.dealerCards)) {
      newResultText = 'It\'s a push!';
      newBankroll = this.props.currentBankroll;
    } else if (this.hasBlackjack(this.state.playerCards)) {
      newResultText = 'Player has blackjack!';
      newBankroll = this.props.currentBankroll + (this.state.betAmount * 1.5);
    } else if (this.hasBlackjack(this.state.dealerCards)) {
      newResultText = 'Dealer has blackjack!';
      newBankroll = this.props.currentBankroll - this.state.betAmount;
    } else {
      return;
    }

    this.props.setAppState({ currentBankroll: newBankroll }, () => {
      this.setState({ resultText: newResultText, gameStatus: 'inputting bet' });
    });
  }

  hasBlackjack = (cards) => ( this.props.gameLogic.getHandTotal(cards).includes(21) );

  handlePlayerHit = () => {
    let playerCards = [...this.state.playerCards];
    let deck = [...this.state.deck];
    playerCards.push(deck.pop());
    this.setState({ playerCards, deck }, this.handlePlayerBust);
  };

  handlePlayerBust = () => {
    let playerHandTotal = this.props.gameLogic.getHandTotal(this.state.playerCards);
    if (Math.min(...playerHandTotal) > 21) {
      document.getElementById('betamount').value = 0;
      this.props.setAppState({
        currentBankroll: this.props.currentBankroll - this.state.betAmount
      }, () => {
        document.getElementById('betamount').value = 0;
        this.setState({
          resultText: 'Player busted!',
          gameStatus: 'inputting bet'          
        }, this.saveUserBankroll);
      });
    }
  }

  handlePlayerStay = () => {
    let dealerCards = [...this.state.dealerCards];
    let deck = [...this.state.deck];
    let dealerHandTotal = this.props.gameLogic.getHandTotal(this.state.dealerCards);
    let playerHandTotal = this.props.gameLogic.getHandTotal(this.state.playerCards);
    let newBankroll, newResultText;

    while (Math.min(...dealerHandTotal) <= 17) {
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

    document.getElementById('betamount').value = 0;
    this.setState({ dealerCards, deck, resultText: newResultText, gameStatus: 'inputting bet' }, () => {
      this.props.setAppState({ currentBankroll: newBankroll }, this.saveUserBankroll);
    });
  }

  handleQuitGame = () => {
    this.props.setAppState({ currentPage: 'Login' }, this.saveUserBankroll);
  }

  handleResetBankroll = () => {
    this.props.setAppState({ currentBankroll: 1000 }, this.saveUserBankroll);
  }

  render = () => (
    <div>
      <Dealer
        cards={this.state.dealerCards}
        gameStatus={this.state.gameStatus}
      />
      <Player
        cards={this.state.playerCards}
        currentBankroll={this.props.currentBankroll}
      />
      <ControlPad
        currentBankroll={this.props.currentBankroll}
        resultText={this.state.resultText}
        gameStatus={this.state.gameStatus}
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