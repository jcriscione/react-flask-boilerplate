
import React from "react";
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import AuthenticatedApp from './components/App/AuthenticatedApp'
import Login from './components/Pages/Login/Login';
import HomePage from './components/Pages/Home/HomePage';
import Dev from './components/Pages/Dev/DevPage';
import DevHome from './components/Pages/Dev/DevHome';
import HR from './components/Pages/HR/HRPage';
import Jobs from './components/Pages/HR/JobsPage';
import Profile from './components/Pages/Profile/ProfilePage';
import Account from './components/Pages/Profile/AccountPage';
import Home from './components/Pages/Home/Home';

import LoginActions from './actions/LoginActions';
import ExecutionEnvironment from 'exenv';
import NotFoundPage from "./components/Pages/NotFoundPage";
import LoginStore from './stores/LoginStore';


// polyfilll
if(!Object.assign)
    Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

function requireAuth(nextState, replaceState) {
    let currentRole = LoginStore.role;
    console.log("role is " + currentRole);

  if (!LoginStore.isLoggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}
 
 if (ExecutionEnvironment.canUseDOM){
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      LoginActions.loginUser(jwt);
    }
}

module.exports = (
<Route component={AuthenticatedApp}>
    <Route path="login" component={Login}/>
    <Route path="home" component={HomePage} >
        <IndexRoute component={Home} />
        <Route path="main" component={Home}  />
    </Route>
    <Route path="dev" component={Dev} onEnter={requireAuth}>
        <IndexRoute component={DevHome} />
        <Route path="home" component={DevHome}/>
    </Route>
    <Route path="hr" component={HR} onEnter={requireAuth}>
        <IndexRoute component={Jobs} />
        <Route path="jobs" component={Jobs}/>
    </Route>
    <Route path="profile" component={Profile} onEnter={requireAuth}>
        <IndexRoute component={Account} />
        <Route path="account" component={Account}/>
    </Route>
    <Redirect from='/' to='home' /> 
    <Route path="*" component={NotFoundPage} />
</Route>

);




