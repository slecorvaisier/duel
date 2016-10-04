import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import './Fighter.css';

import classNames from 'classnames';

class Fighter extends React.Component {

  constructors(props) {}

  componentDidMount() {
    let element = ReactDOM.findDOMNode(this.refs.overlay);
    //let overlayElement = element.getElementsByTagName('div');
    element.addEventListener('animationend', (e) => {
      console.log(e);
      if (e.animationName === 'fadeinOverlay') {
        console.log('end fadein');
      }
      if (e.animationName === 'fadeout') {
        console.log('end of timeline');
      }
    });
    element.addEventListener('animationstart', (e) => {
      console.log(e);
      if (e.animationName === 'fadeout') {
        console.log('start fadeout');
      }
    });
  }

  render () {
    const klass = classNames('fighter', 'avatar', {
    });

    return (
      <div
        className={klass}
        data-index={this.props.index}
        onClick={this.props.handleClick}
      >
        <img src={this.props.img} alt='' />
        <div
          ref='overlay'
          className={classNames('overlay', {
            picked: this.props.picked,
            won: this.props.fighting && this.props.winner,
            lost: this.props.fighting && !this.props.winner,
          })}
          ></div>
        <label>{this.props.name}</label>
      </div>
    )
  }
}

export default Fighter;
