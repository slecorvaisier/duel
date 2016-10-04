import React, { PropTypes } from 'react'
import update from 'react-addons-update';
import './Picker.css';

import Fighter from '../../components/Fighter/Fighter';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: null,
    };
  }

  _pickFighter(e, queueIndex, fighterIndex) {

    console.log('e', e);
    console.log('queueIndex', queueIndex);
    console.log('fighterIndex', fighterIndex);

    console.log('state', this.state.queue[0]);

    const newState = update(
      Object.assign(
        this.state,
        this.state.queue[queueIndex].map((fighter) => {
          fighter.picked = false
        }
      )), {
      queue: {
        [queueIndex]: {
          [fighterIndex]: {
            picked: {
              $set: true,
            },
          },
        },
      },
    });

    this.setState(newState, () => console.log(this.state.queue[0]));
  };

  componentWillMount() {
    this.setState(update(this.state, {
      queue: {
        $set: this.props.queue,
      }
    }));
  }

  componentWillReceiveProps(newProps) {
    this.setState(update(this.state, {
      queue: {
        $set: newProps.queue,
      }
    }));
  }

  render () {
    const { queue } = this.state;
    console.log('queue', queue);

    return (
      <div className="picker">
        <h3>Step 1: Pick your winners</h3>
        {queue.map((fight, i) => (
          <div className='pickerRow' data-index={i} key={i}>
            <label className='versus'>VS</label>
            {fight.map((fighter, j) => (
              <Fighter
                key={`${i}${j}`}
                index={j}
                name={fighter.name}
                img={fighter.img}
                picked={fighter.picked}
                handleClick={(e) => this._pickFighter(e, i, j)}
              />
            ))}
          </div>
        ))}
        <p>
          <button className='submitPicker' onClick={() => this.props.handleStartFights(this.state.queue)}>PLAY</button>
        </p>
      </div>
    )
  }
}

Picker.PropTypes = {
  handleStartFights: React.PropTypes.func.isRequired,
};

export default Picker;
