
import React, {PropTypes} from 'react';
import { SvgIcon } from 'material-ui';
import Svg from './Svg';
import { IconButton } from 'material-ui';

export default class TogButton extends React.Component {

	static contextTypes = {
	    onLockLayout: PropTypes.func.isRequired
	};

	static defaultProps = {
		icons: [ "Lock", "Unlock"]
	};

	static propTypes = {
	    icons: PropTypes.array.isRequired,
	    iconStyle: PropTypes.object.isRequired
	};

	state = {
		toggle: true
	};

	getSVG(){
		return (this.state.toggle) ?  this.props.icons[0] : this.props.icons[1];
	}

	onButtonClicked(){
		this.setState({toggle : !this.state.toggle});
		this.context.onLockLayout();
	}

  render() {
    return (
      <IconButton {...this.props} iconStyle={this.props.iconStyle} onClick={ () => this.onButtonClicked() }>
      <Svg {...this.props} name={this.getSVG()} /></IconButton>
    );
  }

}

