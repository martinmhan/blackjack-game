import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loginmessage: ''
    };

    this.validateExistingUser = this.validateExistingUser.bind(this);
    this.validateNewUser = this.validateNewUser.bind(this);
  }

  validateExistingUser = (event) => {
    event.preventDefault();
    let username = document.getElementById('usernameexisting').value;
    let password = document.getElementById('passwordexisting').value;

    axios.post('/api/login/existing', { username, password })
      .then( ({data}) => {
        if (!data.validLogin) {
          alert(data.message);
        } else {
          this.setState({
            loggedIn: true,
            loginmessage: `Welcome back, ${username}`
          }, () => {
            this.props.setAppState({
              currentUser: username,
              currentBankroll: parseInt(data.message)
            })
          });
        }
      })
      .catch(err => console.error(err));
  };

  validateNewUser = (event) => {
    event.preventDefault();
    let username = document.getElementById('usernamenew').value;
    let password = document.getElementById('passwordnew').value;
    if (username === '') {
      alert('Please enter a valid username.');
    } else if (password === '') {
      alert('Please enter a password');
    } else {
      axios.post('/api/login/new', { username, password })
        .then(({data}) => {
          if (data === 'Username already exists. Please select a different one.') {
            alert(data);
          } else {
            this.setState({
              loggedIn: true,
              loginmessage: `New user account has been created for ${username}`
            }, () => {
              this.props.setAppState({
                currentUser: username,
                currentBankroll: 1000
              });
            });
          }
        })
        .catch(err => console.error(err));
    }
  };

  startGame = () => {
    this.props.setAppState({ currentPage: 'Game' });
  }

  render = () => (
    <div id="loginview">
      <LoginForm
        type={"Existing"}
        onSubmit={this.validateExistingUser}
        loggedIn={this.state.loggedIn}
      />
      <LoginForm
        type={"New"}
        onSubmit={this.validateNewUser}
        loggedIn={this.state.loggedIn}
      />
      <div id="startgame">
        <button id="startgamebtn" disabled={!this.state.loggedIn} onClick={this.startGame}>Start Game</button>
      </div>
      <div id="loginmessage">
        {this.state.loginmessage}
      </div>
    </div>
  );
}

export default Login;
