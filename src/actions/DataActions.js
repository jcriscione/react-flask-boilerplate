
import AppDispatcher from '../vendor/core/Dispatcher.js';
import {DATA_GET} from '../constants/DataConstants.js';

export default {
  gotData: (data, name) => {
    AppDispatcher.dispatch({
      actionType: DATA_GET,
      data: data,
      name: name
    })
  }
}
