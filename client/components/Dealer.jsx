const React = require('react');
const Card = require('./Card.jsx');

const Dealer = (props) => (
  <div id="dealercomponent">
    <h2>Dealer</h2>
    <div id="dealercards">
      {props.cards.map((card, i) => (<Card card={card} index={i} gameStatus={props.gameStatus}/>))}
    </div>
  </div>
);

module.exports = Dealer;