const React = require('react');
const axios = require('axios');

class Login extends React.Component {
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
        if (data === 'Username does not exist.' || data === 'Incorrect password') {
          alert(data);
        } else if (typeof data === 'number') {
          this.setState({
            loggedIn: true,
            loginmessage: `Welcome back, ${username}`
          }, () => {
            this.props.setAppState({
              currentUser: username,
              currentBankroll: data
            })
          });
        } else {
          console.error('Login error');
        }
      });
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
        });
    }
  };

  startGame = () => {
    console.log(this.props.currentBankroll);
    this.props.setAppState({ currentPage: 'Game' });
  }

  render = () => (
    <div>
      <h2>Existing Users</h2>
      <form id="existinguserform" onSubmit={this.validateExistingUser}>
        User Name: <input type="text" id="usernameexisting" disabled={this.state.loggedIn}></input>
        Password: <input type="password" id="passwordexisting" disabled={this.state.loggedIn}></input>
        <input type="submit" value="Log In" disabled={this.state.loggedIn}></input>
      </form>

      <h2>New Users</h2>
      <form id="newuserform" onSubmit={this.validateNewUser}>
        User Name: <input type="text" id="usernamenew" disabled={this.state.loggedIn}></input>
        Password: <input type="password" id="passwordnew" disabled={this.state.loggedIn}></input>
        <input type="submit" value="Log In" disabled={this.state.loggedIn}></input>
      </form>

      <br></br><br></br>
      <div id="loginmessage">{this.state.loginmessage}</div>
      <br></br>
      <button disabled={!this.state.loggedIn} onClick={this.startGame}>Start Game</button>
    </div>
  );
}

module.exports = Login;