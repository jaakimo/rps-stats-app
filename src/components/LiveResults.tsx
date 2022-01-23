import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';

const LiveResults = () => {
  const [show, setShow] = useState(false);
  const matchesInProgress = useAppSelector(
    (state) => state.resultReducer.inProgress,
  );
  const arr = Object.keys(matchesInProgress).map((key) => ({
    ...matchesInProgress[key],
    id: key,
  }));
  return (
    <div onClick={() => setShow(!show)}>
      <h2>
        <i className={`fas fa-chevron-${show ? 'up' : 'down'} small mx-2`}></i>
        Ongoing matches
      </h2>

      {show
        ? arr.map((match) => (
            <div key={match.id}>
              <span>{match.playerA.name}</span>
              <span className="mx-4">VS</span>
              <span>{match.playerB.name}</span>
            </div>
          ))
        : null}
    </div>
  );
};

export default LiveResults;
