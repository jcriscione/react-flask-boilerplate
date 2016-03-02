/*! collaboration of react-stockcharts + @author clacey */

import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';

function withResponsive(ComposedComponent) {
  return class withResponsive extends Component {

      constructor(props) {
         super(props);
         this.resizeListener = () => this.handleWindowResize();
      }

      componentDidMount() {
            window.addEventListener("resize", this.resizeListener );
            var el = ReactDOM.findDOMNode(this);
            var w = el.parentNode.clientWidth;
            var h = el.parentNode.clientHeight;
            this.setState({
                width: w,
                height:h
            });
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.resizeListener );
        }
        handleWindowResize() {
            var el = ReactDOM.findDOMNode(this);
            var w = el.parentNode.clientWidth;
            var h = el.parentNode.clientHeight;
            this.setState({
                width: w,
                height:h
            });
        }
        render() {
            if (this.state && this.state.width)
                return <ComposedComponent width={this.state.width} height={this.state.height} {...this.props} />
            else
                return <div />
        }


  };
}

export default withResponsive;
