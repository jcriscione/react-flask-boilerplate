
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';
import React from 'react';
import ExecutionEnvironment  from 'exenv';
var request = ExecutionEnvironment.canUseDOM ? require('reqwest') : React.DOM.div;

class AuthService {

  login(username, password) {
    return this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        password: password
      })
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(username, password) {
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        password: password
      })
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.access_token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new AuthService()
