const React = require('react');

// stateless?
class ControlPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render = () => (
  <div className="controlpad">
    <div id="results">{this.props.resultText}</div>
    <form id="betsubmitform" onSubmit={this.props.handleBetSubmit}>
      Bet Amount:
      <input type="number" id="betamount" min="1" max={this.props.currentBankroll} disabled={!(this.props.gameStatus==='inputting bet')}></input>
      <input type="submit" id="betsubmit" disabled={!(this.props.gameStatus==='inputting bet')}></input>
    </form>

    <button id="deal" disabled={!(this.props.gameStatus==='bet submitted')} onClick={this.props.handleDeal}>Deal</button>
    <button id="hit" disabled={!(this.props.gameStatus==='in play')} onClick={this.props.handlePlayerHit}>Hit</button>
    <button id="stay" disabled={!(this.props.gameStatus==='in play')} onClick={this.props.handlePlayerStay}>Stay</button>
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