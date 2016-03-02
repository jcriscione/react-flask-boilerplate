

import BaseStore from './BaseStore';

class ClickStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this.leftNavToggled = true;
    this.selectedRow = 2;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case "LEFTNAV_TOGGLE":
        this.leftNavToggled = !this.leftNavToggled;
        this.emitChange();
        break;
     case "ROW_SELECT":
        this.selectedRow = action.rowId;
        this.emit(action.name);
        break;
      default:
        break;
    };
  }
  isLeftNavToggled() {
    return this.leftNavToggled;
  }
  getSelectedRow(){
    return this.selectedRow;
  }
}

export default new ClickStore();
