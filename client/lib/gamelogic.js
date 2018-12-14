module.exports = {
  getNewDeck: () => {
    let deck = [];
    let suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    let numbers = ['A', '2', '3','4','5','6','7','8','9','10','J','Q','K'];
    
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        deck.push(numbers[j] + ' of ' + suits[i]);
      }
    }
  
    return deck;    
  },
  shuffle: (deck) => {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * (deck.length));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  },
  cardValue: {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10
  },
  getHandTotal: (cards) => {
    let total = 0;
    let cardNums = cards.map(card => card.slice(0, card.indexOf(' ')));

    for (let i = 0; i < cardNums.length; i++) {
      total += this.cardValues[cardNums[i]];
    }
  
    if (!cardNums.includes('A')) {
      return [total];
    } else {
      return [total, total + 10];
    }
  }
};

  /////////// EVENT HANDLERS
  
  // const displayCards = function (playerOrDealer) {
  //   if (playerOrDealer === 'player') {
  //     for (let i = 0; i < player.hand.length; i++) {
  //       $('#playercards').append("<div class=card id=playercard" + i + "></div>");
  //       $('#playercard' + i).text(player.hand[i]);
  //       $('#playercard' + i).css("display", "block");
  //     }
  //   } else if (playerOrDealer === 'dealer') {
  //     for (let i = 0; i < dealer.hand.length; i++) {
  //       $('#dealercards').append("<div class=card id=dealercard" + i + "></div>");
  //       $('#dealercard' + i).text(dealer.hand[i]);
  //       $('#dealercard' + i).css("display", "block");
  //     }
  //   }
  // };
  
  // const outOfMoney = function() {
  //   $('#results').append('<div class="result">You\'ve run out of money! Please reset your bankroll if you\'d like to keep playing.</div>');
  //   $('#betamount, #betsubmit').prop('disabled', true);
  //   $('#reset').prop('disabled', false);
  // };
  
  // $('#deal').on('click', function() {
  //   $('#deal').prop('disabled', true);
  //   $('#results').empty();
  //   player.hand = [];
  //   dealer.hand = [];
  //   deck.reset();
  //   deck.shuffle();
  //   deck.deal();
  //   $('.card').remove();
  //   displayCards('player');
  //   displayCards('dealer');
  //   $('#dealercard0').text('???');
  
  //   let playerBlackjack = player.hasBlackjack();
  //   let dealerBlackjack = dealer.hasBlackjack();
  
  //   if (playerBlackjack || dealerBlackjack) {
  //     $('#dealercard0').text(dealer.hand[0]);
  //     if (playerBlackjack && dealerBlackjack) {
  //       player.bankroll += pot;
  //       $('#results').append('<div class="result">It\'s a push!</div>');
  //     } else if (playerBlackjack) {
  //       player.bankroll += Math.ceil(pot * 2.5);
  //       $('#results').append('<div class="result">Player has Blackjack!</div>');
  //     } else if (dealerBlackjack) {
  //       $('#results').append('<div class="result">Dealer has Blackjack!</div>');
  //     }
      
  //     pot = 0;
  //     $('#betamount').val(0);
  //     $('#bankroll').text('Bankroll: $' + player.bankroll);
  
  //     if (player.bankroll === 0) {
  //       outOfMoney();
  //     } else {
  //       $('#betamount, #betsubmit').prop('disabled', false);
  //     }
  //   } else {
  //     $('#hit, #stay').prop('disabled', false);
  //   }
  // });
  
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
  
  // $('#betsubmit').on('click', function() {
  //   let betAmount = parseInt($('#betamount').val());
  //   if (betAmount > player.bankroll) {
  //     alert('Please enter an amount less than or equal to your bankroll.');
  //   } else if (betAmount > 0) {
  //     pot += betAmount;
  //     player.bankroll -= betAmount;
  //     $('#betamount, #betsubmit').prop('disabled', true);
  //     $('#bankroll').text('Bankroll: $' + player.bankroll);
  //     $('#deal').prop('disabled', false);
  //   } else {
  //     alert('Please enter a valid bet amount.');
  //   }
  // });
  
  // $('#quitgame').on('click', function() {
  //   $.post(
  //     '/quitGame',
  //     {
  //       username: localStorage.getItem('username'),
  //       bankroll: player.bankroll
  //     }
  //   ).then(function() {
  //     location.href = location.href.slice(0, location.href.length - 5);
  //   });
  // });
  
  // $('#reset').on('click', function() {
  //   player.bankroll = 1000;
  //   $('#betamount, #betsubmit').prop('disabled', false);
  //   $('#bankroll').text('Bankroll: $' + player.bankroll);
  //   $('#reset').prop('disabled', true);
  // });