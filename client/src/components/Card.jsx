import React from 'react';

const Card = (props) => {
  let imgPath = `images/${props.card}.jpg`;
  if (props.gameStatus === 'in play' && props.index === 0) {
    return (
      <div className="card">
        <img src="images/blue_back.jpg"></img>  
      </div>
    );
  } else {
    return (
      <div className="card">
        <img src={imgPath}></img>
      </div>
    );
  }
};

export default Card;
