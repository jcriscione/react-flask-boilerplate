

import React, { PropTypes } from 'react';
import styles from './Footer.css';
import { Link } from 'react-router';
import LoginStore from '../../stores/LoginStore';
const ToggleDisplay = require('react-toggle-display');

export default class Footer extends React.Component{

static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  render() {
      let ThemeManager = this.context.muiTheme;

     let styles = {
            footerCp: {
              'background': ThemeManager.rawTheme.palette.primary2Color,
              'color': '#FCECC4',
              'paddingTop':'20px',
              'paddingBottom':'30px',
              'textAlign': 'center'
            },
            highlight:{
              'color': ThemeManager.rawTheme.palette.accent1Color
            }
          }

    return (

          <div className="footer">
                  <div style={styles.footerCp}>
                      <img title="This site is currently in BETA and is a work in progress"
                      style={{width: '40px', verticalAlign:'bottom'}} src={require('./footer_logo.png')} /><br />
                      <p />
                       &nbsp; &nbsp; © 2016 Some Company.
                      <p /> 
                      <ul className="links">
                        <li><a href="#!">Link 1</a></li>
                        <li><a href="#!">Link 2</a></li>
                        <li><a href="#!">Link 3</a></li>
                        <li><a href="#!">Link 4</a></li>
                      </ul>
                  </div>
            </div>
    );
  }

}
