
import AppDispatcher from '../vendor/core/Dispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import history from '../../config/history'

export default {
  loginUser: (jwt) => {
    let savedJwt = localStorage.getItem('jwt');

    if (savedJwt !== jwt) {
       history.replaceState(null, '/home') 
       localStorage.setItem('jwt', jwt);
    }

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
  },
  logoutUser: () => {
      history.replaceState(null, '/login')
      localStorage.removeItem('jwt');
      AppDispatcher.dispatch({
        actionType: LOGOUT_USER
      });
  }
}
