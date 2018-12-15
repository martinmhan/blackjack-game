const React = require('react');
const Card = require('./Card.js');

const Player = (props) => (
  <div id="playercomponent">
    <h2 className="header">Player: {'$' + props.currentBankroll}</h2>
    <div id="playercards">
      {props.cards.map((card, i) => (<Card card={card} key={i} />))}
    </div>
  </div>
);

module.exports = Player;