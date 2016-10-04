import React, { PropTypes } from 'react'
import Fighter from '../Fighter/Fighter';

import './Pit.css';

const Pit = (props) => {

  console.log('pit', props);

  let content;
  let win = false;
  if(props.currentFight) {
    content = props.currentFight.map((fighter, i) => {
      if (fighter.picked && fighter.winner) win = true;

      return (<Fighter
        key={i}
        index={i}
        name={fighter.name}
        img={fighter.img}
        picked={fighter.picked}
        fighting={true}
        winner={fighter.winner}
      />);
    });
  }
  else {
    content = null
  }

  return (
    <div className='pit'>
      {content}
      <label className='versus'>VS</label>
      {win && <label className='result result-win'>WIN</label>}
      {!win && <label className='result result-lost'>LOST</label>}
    </div>
  );
}

export default Pit;
