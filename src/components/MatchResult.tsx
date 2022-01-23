import React, { useState } from 'react';
import { GameResult } from '../app/state/resultSlice';
import { getTimeStringSince } from '../utils/functions';
import PlayerStatsModal from './PlayerStatsModal';

interface Props {
  result: GameResult;
}

const MatchResult = ({ result }: Props) => {
  const [playerSelected, setPlayerSelected] = useState('');

  const handlePlayerSelect = (name: string) => {
    setPlayerSelected(name);
  };

  // TODO - cleanup
  return (
    <div className="border rounded-2 mb-2">
      <div className="row">
        <p className="col text-end text-muted small">
          {getTimeStringSince(result.t)}
        </p>
      </div>
      <div className="row text-center">
        <div
          className="col-4 highlight button-player-select"
          onClick={() => handlePlayerSelect(result.playerA.name)}
        >
          {result.playerA.name}
        </div>
        <i
          className={`col-1 fas fa-hand-${result.playerA.played.toLowerCase()} fa-2x ${
            result.winner === 'A' ? 'text-success' : 'text-secondary'
          }`}
        ></i>
        <div className="col-2">VS</div>
        <i
          className={`col-1 fas fa-hand-${result.playerB.played.toLowerCase()} fa-2x ${
            result.winner === 'B' ? 'text-success' : 'text-secondary'
          }`}
        ></i>
        <div
          className="col-4 button-player-select"
          onClick={() => handlePlayerSelect(result.playerB.name)}
        >
          {result.playerB.name}
        </div>
      </div>
      <PlayerStatsModal
        show={playerSelected !== ''}
        playerSelected={playerSelected}
        setPlayerSelected={setPlayerSelected}
      />
    </div>
  );
};

export default MatchResult;
