import React from 'react';

const ControlPad = (props) => (
  <div className="controlpad">
    <div id="results">{props.resultText}</div>
    <form id="betsubmitform" onSubmit={props.handleBetSubmit}>
      Bet Amount:
      <input type="number" id="betamount" min="1" max={props.currentBankroll} disabled={!(props.gameStatus==='inputting bet')}></input>
      <input type="submit" id="betsubmit" disabled={!(props.gameStatus==='inputting bet')}></input>
    </form>

    <button id="deal" disabled={!(props.gameStatus==='bet submitted')} onClick={props.handleDeal}>Deal</button>
    <button id="hit" disabled={!(props.gameStatus==='in play')} onClick={props.handlePlayerHit}>Hit</button>
    <button id="stay" disabled={!(props.gameStatus==='in play')} onClick={props.handlePlayerStay}>Stay</button>
    <button id="quitgame" onClick={ props.handleQuitGame }>Quit Game</button>
    <button id="reset" disabled={!(props.currentBankroll === 0)} onClick={props.handleResetBankroll}>Reset Bankroll</button>
    <br></br>
    <font size="2">
      *Blackjack pays 3:2
      <br></br>
      *No Splits or Doubles
    </font>
  </div>
);

export default ControlPad;
