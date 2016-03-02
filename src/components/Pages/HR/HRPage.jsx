

import React from 'react';
import Page from '../Page';
import PageConstants from '../../../constants/PageConstants';

export default class HRPage extends React.Component {

  render() {
 
    return (
           <Page {...this.props} pageType={PageConstants.HR} />
        );
  }
}
