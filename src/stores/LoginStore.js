

import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';


class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._jwt = null;
    this._role = null;
    this._expiry = "1";
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._jwt = action.jwt;
        let decodedJWT = jwt_decode(this._jwt);
        this._user = decodedJWT.identity;
        this._expiry = decodedJWT.exp;
        this._role = decodedJWT.role;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._user = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get expiry(){
    return this._expiry;
  }

  setExpiry(date){
    this._expiry = date;
  }

  get jwt() {
    return this._jwt;
  }

  get role() {
    return this._role;
  }


  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
