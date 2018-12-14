const React = require('react');
const ReactDOM = require('react-dom');
const gameLogic = require('./lib/gamelogic.js');
const App = require('./components/App.js');

ReactDOM.render(
  <App gameLogic={gameLogic}/>,
  document.getElementById('root')
);