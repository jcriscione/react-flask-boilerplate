
import React, {PropTypes} from 'react';
import { Tabs, Tab } from 'material-ui';
import PageConstants from '../../constants/PageConstants';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

export default class Navigation extends React.Component{

  static propTypes = {
    location: React.PropTypes.object.isRequired,
    history:React.PropTypes.object.isRequired
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

   onTabChange(value, e, tab){
    this.props.history.pushState(null, '/'+value)
  }

  getActiveRoute(){
   let currentPath = (this.props.location.pathname.split(/[\/]/)[1]) || PageConstants.HOME;
   return currentPath;
  }

  render() {
       let ThemeManager = this.context.muiTheme;
       let styles = {
          navStyles:{
           'background': ThemeManager.rawTheme.palette.accent2Color,
           'color': 'rgb(79, 79, 86)',
           'fontFamily': ThemeManager.rawTheme.palette.fontFamily,
           'fontWeight':'200'
          },
          iStyle:{
           'background': ThemeManager.rawTheme.palette.accent1Color,
          }
       }

    return (
         <Tabs style={{'maxWidth':'400px'}} 
          valueLink={{value: this.getActiveRoute(), requestChange: (value, e, tab) => this.onTabChange(value, e, tab) }}
          tabItemContainerStyle={styles.navStyles} inkBarStyle={styles.iStyle} >
          <Tab style={styles.navStyles} label="Home" value={PageConstants.HOME}/>
          <Tab style={styles.navStyles} label="Developer" value={PageConstants.DEV} />
          <Tab style={styles.navStyles} label="HR" value={PageConstants.HR} />
        </Tabs>
    );
  }

}

