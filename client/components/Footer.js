const React = require('react');

const Footer = (props) => (
  <div className="footer">
    <div id="results">{props.resultText}</div>
    <br></br><br></br>
    <button id="quitgame" onClick={() => {
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
    }}>Quit Game</button>
    
    <button id="reset" disabled={!(props.currentBankroll === 0)} onClick={() => {
      // $('#reset').on('click', function() {
      //   player.bankroll = 1000;
      //   $('#betamount, #betsubmit').prop('disabled', false);
      //   $('#bankroll').text('Bankroll: $' + player.bankroll);
      //   $('#reset').prop('disabled', true);
      // });
    }}>Reset Bankroll</button>
    <br></br>
    <font size="2">
      *Blackjack pays 3:2
      <br></br>
      *No Splits or Doubles
    </font>
  </div>
);

module.exports = Footer;