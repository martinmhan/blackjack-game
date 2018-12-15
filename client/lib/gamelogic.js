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
  getHandTotal: (cards) => {
    const cardValues = {
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
    };

    let total = 0;
    let cardNums = cards.map(card => card.slice(0, card.indexOf(' ')));
    for (let i = 0; i < cardNums.length; i++) {
      total += cardValues[cardNums[i]];
    }
  
    if (!cardNums.includes('A')) {
      return [total];
    } else {
      return [total, total + 10];
    }
  },
  hasBlackjack: (cards) => {
    return this.getHandTotal(cards).includes(21);
  }
};