
import React, {PropTypes} from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

let _ = require('lodash');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

export default class Dropdown extends React.Component{

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

 static propTypes = {
    menuItems: PropTypes.array.isRequired,
    history:React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  };

  onMenuChange(e, index, value){
    this.props.history.pushState(null, value);
  }

  getDefaultValue(){
     let currentPath = this.props.location.pathname; 
     let items = this.props.menuItems;
     for (let i in items){
        if ( items[i].route === currentPath ){
             return items[i].route;
           }
     }
     return items[0].route; //default to index route
  }

  
  render() {

    return (
            <DropDownMenu value={this.getDefaultValue()} className="dropdownMenu" onChange={(e, index, value) => this.onMenuChange(e, index, value)} >
              {_.map(this.props.menuItems, (x, i) => {
                return <MenuItem key={x.text} value={x.route} primaryText={x.text}  />
              })}
           </DropDownMenu>   

        );
  }

}
