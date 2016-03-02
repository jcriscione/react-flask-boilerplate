

import {DATA_GET} from '../constants/DataConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class DataStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._data = {};
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case DATA_GET:
        this._data[action.name] = action.data;
        this.emit(action.name);
        break;
      case LOGOUT_USER:
        this._data = {};
        this.emitChange();
        break;
      default:
        break;
    };
  }

  getData(name) {
    return (this._data) ? this._data[name] : null;
  }
}

export default new DataStore();
