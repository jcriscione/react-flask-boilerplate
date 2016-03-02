

import React, {PropTypes} from 'react';
import { RouteHandler, Link } from 'react-router';
import AuthenticatedComponent from '../App/AuthenticatedComponent'
import SideNav from '../Navigation/SideNav';
import withViewport from '../../vendor/decorators/withViewport';
import ViewConstants from '../../constants/ViewConstants';
import PageConstants from '../../constants/PageConstants';
import ClickStore from '../../stores/ClickStore';
const ToggleDisplay = require('react-toggle-display');

@withViewport
export default AuthenticatedComponent(class Page extends React.Component {

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  state = {
    leftNavToggle: ''
  }
  
  static propTypes = {
      children: React.PropTypes.node.isRequired,
      pageType: PropTypes.string.isRequired,
      viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  constructor() {
    super()
    this.state.leftNavToggle = this.getLeftNavState();
  }

  componentDidMount() {
    this.toggleChangeListener = () => this.onToggleChange();
    ClickStore.addChangeListener(this.toggleChangeListener);
  }

   onToggleChange() {
    this.setState({ leftNavToggle: this.getLeftNavState()});
  }

   componentWillUnmount() {
    ClickStore.removeChangeListener(this.toggleChangeListener);
  }

   getLeftNavState() {
    return ClickStore.isLeftNavToggled();
  }
   showNav(){
    let toggle = this.state.leftNavToggle;
    return (this.props.viewport.width < ViewConstants.SM) ? !toggle : toggle;
  }

  render() {
    let ThemeManager = this.context.muiTheme;
    let styles = {
      container: {
      'background': ThemeManager.rawTheme.palette.canvasColor
        }
    }
    let { pageType } = this.props;
     
    return (
          <div className="wrapper" style={styles.container}>           
           <main>
              {this.props.children}
           </main>
            <ToggleDisplay className="nav" show={this.showNav() && (pageType !== PageConstants.NONE)} > 
             <SideNav pageType={this.props.pageType} />
            </ToggleDisplay>
           </div>
    	  );
  }
});
