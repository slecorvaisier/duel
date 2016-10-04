import React, { PropTypes } from 'react'
import './Arena.css';

import update from 'react-addons-update';
import Pit from '../../components/Pit/Pit';

class Arena extends React.Component {
  constructor(props) {
    super(props);

    this.setResults = this._setResults.bind(this);
    this.queueNext = this._queueNext.bind(this);

    this.state = {
      queue: [],
      currentFightIndex: 0,
    }
  }

  _setResults(queue) {
    return queue.map(fight => {
      let winnerIndex = Math.round(Math.random());
      return fight.map((fighter, i) => {
        if (i === winnerIndex) {
          fighter.winner = true
        } else {
          fighter.winner = false;
        }
        return fighter;
      })
    })
  }

  _queueNext() {
    this.setState((previousState, currentProps) => {
      return { queue: previousState.queue, currentFightIndex: previousState.currentFightIndex + 1 };
    }, () => console.log(this.state));
  }

  componentWillMount() {
    let finalQueue = this.setResults(this.props.queue);
    this.setState(update(this.state, {
      queue: {
        $set: finalQueue,
      },
    }));
  }

  componentDidMount() {
    const id = setInterval(() => {
      if(this.state.currentFightIndex > this.state.queue.length - 1 ){
          clearInterval(id);
          return;
      }
      console.log('next');
      this.queueNext();
    }, 4000);
  }

  render () {
    return (
      <div className='arena'>
        {this.state.currentFightIndex >= 0 && <Pit currentFight={this.state.queue[0]} />}
        {this.state.currentFightIndex >= 1 && <Pit currentFight={this.state.queue[1]} />}
        {this.state.currentFightIndex >= 2 && <Pit currentFight={this.state.queue[2]} />}
      </div>
    );
  }
}

export default Arena;
