import React from 'react';

const Card = (props) => (
  props.gameStatus === 'in play' && props.index === 0 ? 
    <div className="card">
      <img src="images/blue_back.jpg"></img>
    </div> :
    <div className="card">
      <img src={`images/${props.card}.jpg`}></img>
    </div>
);

export default Card;
