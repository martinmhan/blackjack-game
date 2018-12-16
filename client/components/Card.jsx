const React = require('react');

const Card = (props) => {
  console.log(props.card);
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

module.exports = Card;