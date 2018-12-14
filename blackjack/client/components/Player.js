const React = require('react');
const axios= require('axios');
const Card = require('./Card.js');

const Player = (props) => (
  <div className="player">
    <h2 className="header">Player</h2>
    
    Bankroll: {props.currentBankroll}
    <br></br><br></br>
    Bet Amount:
    <input type="number" id="betamount"></input>
    <input type="submit" id="betsubmit"></input>
    
    <div id="playercards">
      {props.cards.map((card, i) => (<Card card={card} key={i} />))}
    </div>

    <br></br>
    <button id="deal">Deal</button>
    <button id="hit">Hit</button>
    <button id="stay">Stay</button>
  </div>
);

module.exports = Player;