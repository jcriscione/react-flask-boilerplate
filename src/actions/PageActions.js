

import AppDispatcher from '../vendor/core/Dispatcher.js';

export default {
  toggleNav: () => {
        AppDispatcher.dispatch({
          actionType: "LEFTNAV_TOGGLE"
        });
    },
  selectRow: (rowId, name) => {
        AppDispatcher.dispatch({
          actionType: "ROW_SELECT",
          rowId,
          name
        });
   }
}
