

import React, {PropTypes} from 'react';
import styles from './SideBar.css';
import mui from 'material-ui';
import PageConstants from '../../constants/PageConstants';
import { Toolbar, ToolbarGroup} from 'material-ui';
import Svg from '../../svgicons';
import { List, ListItem } from 'material-ui';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router';

let SettIcon = require('material-ui/lib/svg-icons/action/settings');
let CompassIcon = require('material-ui/lib/svg-icons/editor/insert-chart');
let ChartIcon = require('material-ui/lib/svg-icons/editor/insert-chart');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

export default class SideNav extends React.Component{

 static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

 static propTypes = {
    pageType: PropTypes.string,
    children: PropTypes.node
  };

 constructor() {
    super()
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  getList(pageType){
     let ThemeManager = this.context.muiTheme;
     let styles = {
         iconStyles:{
          'fill': ThemeManager.rawTheme.palette.primary3Color,
          'stroke': ThemeManager.rawTheme.palette.primary3Color,
          'height':'20px',
          'width':'20px',
          'left': '20px',
          'top':'5px',
        },
         iStyles:{
          'fontWeight': '100',
          'color': ThemeManager.rawTheme.palette.primary3Color,
          'fontFamily': ThemeManager.rawTheme.palette.fontFamily,
          'fontSize':'15px',
        },
         listStyles:{
          'fontWeight': '400',
          'backgroundColor':ThemeManager.rawTheme.palette.primary1Color,
          'paddingTop':'0px',
          'paddingLeft':'-10px'
        },
        active:{
          'backgroundColor':"#232638",
          'borderLeft':"3px solid #21b0f3"
        }
      }

    switch(pageType) {
      case PageConstants.HOME:
        return (
            <List style={styles.listStyles} >
            <ListItem primaryText="Team" leftIcon={<Svg name="JSIIcon" style={styles.iconStyles} />} style={styles.iStyles}  containerElement={<Link to="/home" />}  /> 
            <ListItem primaryText="News" leftIcon={<Svg name="TalkIcon" style={styles.iconStyles} />} style={styles.iStyles}  href="#" />
            <ListItem primaryText="Calendar" leftIcon={<Svg name="CalIcon" style={styles.iconStyles} />} style={styles.iStyles} href="#" />
            </List>
          )
         break;

      case PageConstants.DEV:
        return (
            <List style={styles.listStyles} >
            <ListItem primaryText="Monitoring" leftIcon={<ChartIcon style={styles.iconStyles} />} style={styles.iStyles}  containerElement={<Link to="/dev" />} />
            <ListItem primaryText="Gitlab" leftIcon={<Svg name="GitIcon" style={styles.iconStyles} />} style={styles.iStyles}  />
            <ListItem primaryText="Issues" leftIcon={<Svg name="IssueIcon" style={styles.iconStyles} />} style={styles.iStyles}  />
            </List>
          )
         break;        
        
      case PageConstants.HR:
        return (
            <List style={styles.listStyles} >
            <ListItem primaryText="Jobs" leftIcon={<Svg name="HRIcon" style={styles.iconStyles} />} style={styles.iStyles}  containerElement={<Link to="/hr" />}  />
            <ListItem primaryText="Hiring" leftIcon={<Svg name="MeIcon" style={styles.iconStyles} />} style={styles.iStyles}  />
            <ListItem primaryText="Action Items" leftIcon={<Svg name="ActionIcon" style={styles.iconStyles} />} style={styles.iStyles}  />
            </List>
          )
         break;  

      case PageConstants.PROFILE:
        return (
            <List style={styles.listStyles} >
            <ListItem primaryText="Account" leftIcon={<CompassIcon style={styles.iconStyles} />} style={styles.iStyles} containerElement={<Link to="/profile" />}  />
            <ListItem primaryText="Settings" leftIcon={<SettIcon style={styles.iconStyles} />} style={styles.iStyles}  />
            <ListItem primaryText="Logout" leftIcon={<Svg name="LogoutIcon" style={styles.iconStyles} />} style={styles.iStyles} onClick={this.logout} />
            </List>    
          )
         break;  
  
    }   
  } //TODO, take out listItems from here and put inside individual pages as childrne of Sidebar

  render() {
      const { pageType } = this.props;

    return (
          <div className="sidebar">
          <div className="bg"><img className="badges" src={require('./badges.png')} /></div>
          { (pageType) ? this.getList(pageType) : this.props.children }
          </div>
    );
  }

}
