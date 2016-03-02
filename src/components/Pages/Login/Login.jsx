

import styles from './Login.css';
import React, {PropTypes} from 'react';
import Auth from '../../../services/AuthService'
import { RaisedButton } from 'material-ui';
const Snackbar = require('material-ui/lib/snackbar');

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      showError: false
    };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.refs.username.value, this.refs.password.value)
      .catch(function(err) {
        this.setState({showError: true})
        console.log("Error logging in", err);
      }.bind(this));
  }

/*
  signup(e) {
    e.preventDefault();
    Auth.signup(this.state.user, this.state.password)
      .catch(function(err) {
        alert("There's an error signing up");
        console.log("Error logging in", err);
      });
  }*/

  render() {
    console.log("Login is rendering");
    return (

      <div className="login">
        <h2>Sign in</h2>
        <form role="form" onSubmit={ e => this.login(e) } >
          <fieldset>
          <p><input type="username" className="form-control" id="username" ref="username" placeholder="Username" /></p>
          <p />
          <p><input type="password" className="form-control" id="password" ref="password" placeholder="Password" /></p>
          <p /><RaisedButton label="LOGIN" primary={true} type="submit" />
          {/**
          &nbsp;&nbsp;&nbsp;<RaisedButton label="SIGN UP" primary={true} onClick={ e => this.signup(e) } /></p>
          **/}
        </fieldset>
      </form>

          <Snackbar
          ref="snackbar"
          bodyStyle={{'background': '#e4a700', 'fontWeight': '500', 'letterSpacing':'0.5px'}}
          message="Your username or password is incorrect. Please try again."
          open={this.state.showError}
          onRequestClose={() => { this.setState({ showError: false }) }}
          onActionTouchTap={this._handleAction} />

    </div>
    );
  }
}

