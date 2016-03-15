

import React from 'react';
import styles from './Header.css';
import { AppBar, Avatar, IconButton } from 'material-ui';
import Svg from '../../svgicons';
import PageActions from '../../actions/PageActions';
import Navigation from '../Navigation';
import { Link } from 'react-router';
import PageConstants from '../../constants/PageConstants';
import LoginStore from '../../stores/LoginStore';
import Paper from 'material-ui/lib/paper'

let _ = require('lodash');
let Settings = require('material-ui/lib/svg-icons/action/settings');
let Mail = require('material-ui/lib/svg-icons/content/mail');
let SearchIcon = require('material-ui/lib/svg-icons/action/search');
let MoneyIcon = require('material-ui/lib/svg-icons/editor/attach-money');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();


export default class Header extends React.Component{

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  toggleNav() {
    PageActions.toggleNav();
  }

  render() {

      let ThemeManager = this.context.muiTheme;

      let styles = {
          paperStyle: {
          'padding':'5px',
          'background': ThemeManager.rawTheme.palette.accent1Color,
          },
          navStyle: {
          'background': ThemeManager.rawTheme.palette.accent2Color,
          'boxShadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
         },
          iconStyles: {
          'fill': ThemeManager.rawTheme.palette.accent2Color,
          'color': ThemeManager.rawTheme.palette.accent2Color,
          'stroke': ThemeManager.rawTheme.palette.accent2Color,
          'padding':'20px',
          'strokeWidth': '1'
        },
          buttonStyles:{
          'padding':'0px',
          'width':'45px',
          'height':'45px',
          'marginTop':'20px',
          'transform':'scale(0.8)'
        },
          avatarStyle:{
            'margin':'25px',
            'padding':'0px',
            /*'cursor':'pointer'*/
         },
          appbarStyle:{
            /*'borderBottom': '4px solid #232638',*/
            'minHeight':'80px'
         },
         logoStyle:{
             'width' : '15px',
             'paddingTop' :'23px',
             'paddingLeft':'30px',
             'cursor': 'pointer'
         }
    }

    return (
      <div className="ht-wrapper">
        <AppBar
          title="Title"
          style={styles.appbarStyle}
          className="appbar"
          iconElementLeft={ <img title="Click to toggle the sidebar" 
          style={styles.logoStyle} 
          src={require('./logo_simple.png')} onClick={() => this.toggleNav()}/> } >
             <div>
                <IconButton style={styles.buttonStyles} iconStyle={styles.iconStyles} ><SearchIcon /></IconButton>
                <IconButton style={styles.buttonStyles} iconStyle={styles.iconStyles} ><Mail /></IconButton>
                <IconButton style={styles.buttonStyles} iconStyle={styles.iconStyles} ><Svg name="BellIcon" style={styles.iconStyles}  /></IconButton>
                <IconButton style={styles.buttonStyles} iconStyle={styles.iconStyles} ><Settings style={styles.iconStyles} /></IconButton>
                    <div className="username" >
                        <Link to="/profile">
                        <Avatar style={styles.avatarStyle} 
                        src={require('./avatar.png')} />
                       {LoginStore.user ? LoginStore.user : "Guest"}
                        </Link>
                    </div>
                     
                       
            </div>
       
          </AppBar>
          <div style={styles.navStyle}><Navigation {...this.props} /></div>

       </div>
    );
  }

}
