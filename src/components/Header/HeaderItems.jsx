

import React from 'react';
import styles from './Header.css';
import PageConstants from '../../constants/PageConstants';

let _ = require('lodash');
let Paper = require('material-ui/lib/paper');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();


export default class HeaderItems extends React.Component{

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  state = {
    pnlData: '',
    pageState:''
  };

  constructor() {
    super()
  }


  getTableItems(state){

    if(state === PageConstants.QUANT){
      //data= PnlService.get(); TODO..use current route from props
      let data = {
        "PnL":"$12,000,000",
        "Total Pnl":"$30,000,000",
        "Position":"$356,000",
      }

     return [
        
            <tr className="tr-bold" key={"hi-col1"}>
              {_.map(data, (x, i) => {
                return <td key={"a"+i}>{x}</td>;
              })}
            </tr>
            ,
            <tr className="tr-right" key={"hi-col2"}>
               {_.map(data, (x, i) => {
                return <td key={"b"+i}>{i}</td>;
              })}
            </tr>
        ];
    }
  }

  render() {

    return (
          <table cellSpacing="0">
           <tbody>
             {this.getTableItems(this.state.pageState)}
            </tbody>
          </table>
    );
  }

}
