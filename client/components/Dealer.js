const React = require('react');
const Card = require('./Card.js');

const Dealer = (props) => (
  <div>
    <h2>Dealer</h2>
    <div id="dealercards">
      {props.cards.map((card, i) => (<Card card={card} key={i} />))}
    </div>
  </div>
);

module.exports = Dealer;