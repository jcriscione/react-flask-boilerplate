
import React from 'react';
import mui from 'material-ui';
import { Tabs, Tab } from 'material-ui';
import ActionsTable from '../Table/ActionsTable'
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class TabsComponent extends React.Component{

  render() {
    return (
       <Tabs>
        <Tab label="Action Items" value="a" >
          <ActionsTable />
        </Tab>
        <Tab label="Tab B" value="b">
            <div className="main-wrapper">
             <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est
             </p>
          </div>
        </Tab>
        <Tab label="Tab B" value="b">
         <div className="main-wrapper">
            <p>
              qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </div>
        </Tab>
      </Tabs>
    );
  }

}

export default TabsComponent;
