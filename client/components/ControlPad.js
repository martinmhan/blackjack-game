const React = require('react');

class ControlPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleBetSubmit = () => {
    let betAmount = document.getElementById('betamount').value;
    if (betAmount <= 0) {
      alert('Please enter a valid bet amount.');
    } else {
      this.props.updateGameState({ betAmount , gameStatus: 'bet submitted' });
    }
  };

  render = () => (
  <div className="controlpad">
    <div id="results">{this.props.resultText}</div>
    <br></br><br></br>
    Bet Amount:
    <input type="number" id="betamount" ></input>
    <input type="submit" id="betsubmit" disabled={!(this.props.gameStatus==='inputting bet')} onClick={this.submitBet}></input>

    <br></br><br></br>

    <button id="deal" disabled={!(this.props.gameStatus==='bet submitted')} onClick={this.props.dealInitialCards}>Deal</button>
    <button id="hit" disabled={!(this.props.gameStatus==='in play')} onClick={this.playerHit}>Hit</button>
    <button id="stay" disabled={!(this.props.gameStatus==='in play')} onClick={this.playerStay}>Stay</button>
    <button id="quitgame" onClick={ this.props.handleQuitGame }>Quit Game</button>

    <button id="reset" disabled={!(this.props.currentBankroll === 0)} onClick={this.props.handleResetBankroll}>Reset Bankroll</button>
    <br></br>
    <font size="2">
      *Blackjack pays 3:2
      <br></br>
      *No Splits or Doubles
    </font>
  </div>
  );
}

module.exports = ControlPad;