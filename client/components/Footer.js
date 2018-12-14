const React = require('react');

const Footer = (props) => (
  <div className="footer">
    <div id="results"></div>
    <button id="quitgame">Quit Game</button>
    <button id="reset" disabled={!(props.currentBankroll === 0)}>Reset Bankroll</button>
    <br></br>
    <font size="2">
      *Blackjack pays 3:2
      <br></br>
      *No Splits or Doubles
    </font>
  </div>
);

module.exports = Footer;