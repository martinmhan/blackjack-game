/* eslint-disable no-param-reassign */
module.exports = {
  getNewDeck: () => {
    const deck = [];
    const suits = ['Diam', 'C', 'H', 'S'];
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let i = 0; i < suits.length; i += 1) {
      for (let j = 0; j < numbers.length; j += 1) {
        deck.push(numbers[j] + suits[i]);
      }
    }

    return deck;
  },
  shuffle: (deck) => {
    for (let i = 0; i < deck.length; i += 1) {
      const j = Math.floor(Math.random() * (deck.length));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  },
  getHandTotal: (cards) => {
    const cardValues = {
      A: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      J: 10,
      Q: 10,
      K: 10,
    };

    let total = 0;
    const cardNums = cards.map(card => (card[1] === '0' ? card.slice(0, 2) : card[0]));
    for (let i = 0; i < cardNums.length; i += 1) {
      total += cardValues[cardNums[i]];
    }

    if (!cardNums.includes('A')) {
      return [total];
    }

    return [total, total + 10];
  },
};
