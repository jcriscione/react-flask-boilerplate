

import React, {PropTypes} from 'react';
import LoginStore from '../../stores/LoginStore';
import { Link } from 'react-router';
import styles from './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Login from '../Pages/Login/Login';
import Navigation from '../Navigation';
import mui, { Snackbar } from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './AppTheme';

const Colors = mui.Styles.Colors;
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class AuthenticatedApp extends React.Component {
  
  state = {
      userLoggedIn: '',
      expiry:''
    }

  constructor(props) {
    super(props)
    this.state.userLoggedIn = this.getLoginState();
    this.state.expiry = this.getExpiry();
    this.loginChangeListener = () => this.onLoginChange();
  }

  static propTypes = {
   children: React.PropTypes.node.isRequired,
  }

   getExpiry() {
    return LoginStore.expiry;
  }
   getLoginState() {
    return LoginStore.isLoggedIn();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.loginChangeListener);
  }

   onLoginChange() {
    this.setState({ userLoggedIn: this.getLoginState(), 
                    expiry: this.getExpiry() 
                  });
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.loginChangeListener);
  }

  render() {
    console.log("Rerendering APP");
    return (
      <div className="container">
        <Header {...this.props} />
          {this.getNavItems()}
        <Footer/>
      </div>
    );
  }

  getNavItems() {
    if(!this.state){
      return " ";
    }
    if (!this.state.userLoggedIn) {

      return (
      <div className="centered">
         <Login />

        <Snackbar
          message="Your credentials have expired. Please re-login."
          open={!this.state.expiry}
          bodyStyle={{'background': '#e4a700', 'fontWeight': '500', 'letterSpacing':'0.5px'}}
          autoHideDuration={3000}
          onRequestClose={() => {}} 
          onActionTouchTap={this._handleAction}/>

      </div>
      )
    } else {
      return (  
           this.props.children
      )
    }
  }

}
  

