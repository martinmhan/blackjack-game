const React = require('react');
const axios = require('axios');
const Card = require('./Card.js');

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: null,
      handTotal: this.props.gameLogic.getHandTotal(this.props.cards)
    };
  }

  submitBet = () => {
    let betAmount = document.getElementById('betamount').value;
    if (betAmount <= 0) { alert('Please enter a valid bet amount.'); }
    else {
      this.setState({ betAmount }, () => {
        this.props.updateGameState({ gameStatus: 'bet submitted' });
      });
    }
  }

  playerStay = () => {
    // $('#stay').on('click', function() {
    //   let playerTotal, dealerTotal;
    //   $('#hit, #stay').prop('disabled', true);
    //   displayCards('dealer');
    
    //   while (Math.min(...dealer.getHandTotal()) < 17) {
    //     dealer.getCard(deck.cards.pop());
    //     displayCards('dealer');
    //   }
    
    //   if (player.getHandTotal().length === 1 || player.getHandTotal()[1] > 21) {
    //     playerTotal = player.getHandTotal()[0];
    //   } else {
    //     playerTotal = player.getHandTotal()[1];
    //   }
    
    //   if (dealer.getHandTotal().length === 1 || dealer.getHandTotal()[1] > 21) {
    //     dealerTotal = dealer.getHandTotal()[0];
    //   } else {
    //     dealerTotal = dealer.getHandTotal()[1];
    //   }
    
    //   if (dealerTotal > 21) {
    //     player.bankroll += pot * 2;
    //     $('#results').append('<div class="result">Dealer busted!</div>');
    //   } else if (playerTotal === dealerTotal) {
    //     player.bankroll += pot;
    //     $('#results').append('<div class="result">It\'s a push!</div>');
    //   } else if (playerTotal > dealerTotal) {
    //     player.bankroll += pot * 2;
    //     $('#results').append('<div class="result">Player wins!</div>');
    //   } else {
    //     $('#results').append('<div class="result">Dealer wins!</div>');
    //   }
    
    //   pot = 0;
    //   $('#betamount').val(0);
    //   $('#bankroll').text('Bankroll: $' + player.bankroll);
    
    //   if (player.bankroll === 0) {
    //     outOfMoney();
    //   } else {
    //     $('#betamount, #betsubmit').prop('disabled', false);
    //   }
    // });
  }

  playerHit = () => {
    let playerCards = [...this.props.cards];
    let deck = [...this.props.deck];
    playerCards.push(deck.pop());
    this.props.updateGameState({ playerCards, deck }, () => {
      if (Math.min(this.state.handTotal) > 21) {
        this.props.updateAppState({
          resultText: 'Player busted!',
          currentBankroll: this.props.currentBankroll - this.state.betAmount
        });

      }
    });


    // $('#hit').on('click', function() {
    //   player.getCard(deck.cards.pop());
    //   displayCards('player');
    //   let playerTotal = player.getHandTotal();
    //   if (Math.min(...playerTotal) > 21) {
    //     $('#results').append('<div class="result">Player busted!</div>');
    //     pot = 0;
    //     $('#betamount').val(0);
    //     $('#hit, #stay').prop('disabled', true);
    
    //     if (player.bankroll === 0) {
    //       outOfMoney();
    //     } else {
    //       $('#betamount, #betsubmit').prop('disabled', false);
    //     }
    //   }
    // });
  }

  render = () => (
    <div className="player">
      <h2 className="header">Player</h2>
      Bankroll: {'$' + this.props.currentBankroll}
      <br></br><br></br>
      Bet Amount:
      <input type="number" id="betamount" disabled={!(this.props.gameStatus==='inputting bet')}></input>
      <input type="submit" id="betsubmit" disabled={!(this.props.gameStatus==='inputting bet')} onClick={this.submitBet}></input>

      <div id="playercards">
        {this.props.cards.map((card, i) => (<Card card={card} key={i} />))}
      </div>

      <br></br>
      <button id="deal" disabled={!(this.props.gameStatus==='bet submitted')} onClick={ () => {this.props.dealInitialCards();} }>Deal</button>
      <button id="hit" disabled={!(this.props.gameStatus==='in play')} onClick={this.props.dealCardToPlayer}>Hit</button>
      <button id="stay" disabled={!(this.props.gameStatus==='in play')} onClick={this.playerStay}>Stay</button>
    </div>
  );
};

module.exports = Player;