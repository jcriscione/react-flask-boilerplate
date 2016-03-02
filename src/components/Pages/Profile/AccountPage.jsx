
import React from 'react';
import AuthenticatedComponent from '../../App/AuthenticatedComponent'
import RaisedButton from 'material-ui/lib/raised-button';
import AuthService from '../../../services/AuthService';

export default AuthenticatedComponent(class Account extends React.Component {

static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
  	 let ThemeManager = this.context.muiTheme;

     let styles = {
              iconStyles: {
              'fill': ThemeManager.rawTheme.palette.primary1Color,
              'color': ThemeManager.rawTheme.palette.primary1Color,
              'height': '16px',
            },
              buttonStyles:{
              'padding':'0px',
              'width':'37px',
              'height':'37px',
              'marginTop':'20px'
            }
        }

    return (  
    		  <div>
    		  <h1>{this.props.user ? this.props.user : ''}&#39;s Profile</h1>
    		  <a href onClick={this.logout}>Logout</a>
          <br /> <br />
          <p />
          <RaisedButton label="back" primary={true} type="submit" onClick={ () =>  this.goBack() } />
    		  </div>
    	);
  }
});
