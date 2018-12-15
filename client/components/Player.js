const React = require('react');
const Card = require('./Card.js');

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: null,
      handTotal: this.props.gameLogic.getHandTotal(this.props.cards)
    };
  }

  render = () => (
    <div className="player">
      <h2 className="header">Player</h2>
      Bankroll: {'$' + this.props.currentBankroll}

      <div id="playercards">
        {this.props.cards.map((card, i) => (<Card card={card} key={i} />))}
      </div>
    </div>
  );
};

module.exports = Player;