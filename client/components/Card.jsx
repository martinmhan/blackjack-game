const React = require('react');

const Card = (props) => (
  <div className="card">
    {(props.gameStatus === 'in play' && props.index === 0) ? '???' : props.card}
  </div>
);

module.exports = Card;