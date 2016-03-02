
import DataActions from '../actions/DataActions';
import LoginStore from '../stores/LoginStore.js';
import React from 'react';
import ExecutionEnvironment from 'exenv';
const reqwest = ExecutionEnvironment.canUseDOM ? require('reqwest') : React.DOM.div;
import AuthService from '../services/AuthService';
import { Promise } from 'es6-promise-polyfill'; //polyfill for IE, not necessary for modern browsers

class DataService {

  getData(data_url, name) {
    let scope = this;
    reqwest({
      url: data_url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json', //application/json, text/plain
      headers: {
        'Authorization': 'JWT ' + LoginStore.jwt
      }
    })
    .then(function(response) {
      console.log("Got data" + response);
      DataActions.gotData(response, name);
    })
    .fail(function(response) {
      console.log("Failed to retrieve data " + response.responseURL);
      scope.checkExpiry(response);
    });
  }

  checkExpiry(e){
    let response = {};
    try {
        response = JSON.parse(e.response);
    } catch (exception) {
        response = null;
    }
    if (response && response.error === "Invalid token"){
        LoginStore.setExpiry('');
        AuthService.logout();
    }
  }

  getJSON(data_url) {
      let r = 
          reqwest({
              url: data_url,
              method: 'GET',
              crossOrigin: true,
              type: 'json',
              contentType: 'application/json', //application/json, text/plain
              headers: {
                'Authorization': 'JWT ' + LoginStore.jwt
              }
          })
       return r;
   }

  requestMultiData(urls, name){
    let requests = [];
    let scope = this;
    this.name = name;

    for (let url of urls){
         let promise = Promise.resolve(this.getJSON(url));
         requests.push(promise);
    }

    Promise.all(requests).then(function(values) { 
    DataActions.gotData(values, name);

    }).catch(function(e) {
        //debugger;
        DataActions.gotData("ERR_NO_DATA", scope.name);
        console.log("Failed to retrieve data " + e.responseURL);
        scope.checkExpiry(e);
    });
  }

}

export default new DataService()
