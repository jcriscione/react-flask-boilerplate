
import routes from "../src/mainRoutes";
import React from "react";
import Router from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'
import history from './history'
import "babel-core/polyfill";
import ReactDOM from 'react-dom';

ReactDOM.render(<Router history={history} routes={routes}/>, 
    document.getElementById("content"));
