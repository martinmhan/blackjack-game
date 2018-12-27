import React from 'react';

const LoginForm = (props) => (
  <div className="loginform">
    <div className="loginformheader">{`${props.type} Users`}</div>
    <form id={`${props.type.toLowerCase()}userform`} onSubmit={props.onSubmit}>
      User Name: <input type="text" className="usernameinput" id={`username${props.type.toLowerCase()}`} disabled={props.loggedIn}></input>
      Password: <input type="password" id={`password${props.type.toLowerCase()}`} disabled={props.loggedIn}></input>
      <input type="submit" value="Log In" disabled={props.loggedIn}></input>
    </form>
  </div>
);

export default LoginForm;
