import React, { PropTypes } from 'react'
import './Root.css';

import Picker from '../Picker/Picker';
import Arena from '../Arena/Arena';
import update from 'react-addons-update';
import shuffle from 'shuffle-array';

const FIGHTERS = [
  { name: 'peanuts', picked: false, img: 'https://randomuser.me/api/portraits/men/64.jpg' },
  { name: 'charlie', picked: false, img: 'https://randomuser.me/api/portraits/women/93.jpg' },
  { name: 'serge', picked: false, img: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Canard WC', picked: false, img: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Bitterbollen', picked: false, img: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Frikadelle', picked: false, img: 'https://randomuser.me/api/portraits/women/66.jpg' },
];

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.loadFighters = this._loadFighters.bind(this);
    this.createFightQueue  = this._createFightQueue.bind(this);
    this.startFights  = this._startFights.bind(this);

    this.state = {
      step: 0,
      fighters: [],
      fightQueue: [],
    }
  }

  _loadFighters() {
    this.setState(update(this.state, {
      fighters: {
        $set: shuffle(FIGHTERS),
      },
    }), () => {
      this.createFightQueue();
    });
  }

  _createFightQueue() {
    let queue = [];
    for (let i = 0; i <= this.state.fighters.length; i+= 2) {
      queue.push(this.state.fighters.slice(i, i+2));
    }
    this.setState(update(this.state, {
      fightQueue: {
        $set: queue.filter(fight => fight.length === 2),
      }
    }), () => console.log(this.state));
  }

  _startFights(newQueue) {
    this.setState(update(this.state, {
      fightQueue: {
        $set: newQueue,
      },
      step: {
        $set: 1,
      },
    }), () => console.log(this.state));
  }

  componentWillMount() {
    this.loadFighters();
  }

  render () {

    let content = null;
    if (this.state.step === 1) {
      content = <Arena queue={this.state.fightQueue} />;
    }
    else {
      content = <Picker queue={this.state.fightQueue} handleStartFights={this.startFights} />;
    }

    return (
      content
    )
  }
}

export default Root;
