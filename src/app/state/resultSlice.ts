/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { winningPlayer } from '../../utils/functions';

export interface Player {
  name: string;
  played: string;
}

export interface GameResult extends GameResultFromApi {
  winner?: 'A' | 'B';
}

export interface GameInProgress {
  [id: string]: {
    t: number;
    playerA: Player;
    playerB: Player;
  };
}
export interface GameResults {
  completed: GameResult[];
  inProgress: GameInProgress;
}

export interface GameResultFromApi {
  gameId: string;
  t: number;
  type: string;
  playerA: Player;
  playerB: Player;
}

const initialState: GameResults = { completed: [], inProgress: {} };

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    initialize: (state, action: { payload: GameResultFromApi[] }) => {
      state.completed = action.payload
        .map((game) => ({
          ...game,
          winner: winningPlayer(game.playerA, game.playerB),
        }))
        .sort((a, b) => a.t - b.t);
    },

    addResult: (state, action: { payload: GameResultFromApi }) => {
      if (state.inProgress[action.payload.gameId])
        delete state.inProgress[action.payload.gameId];
      state.completed.push({
        ...action.payload,
        winner: winningPlayer(action.payload.playerA, action.payload.playerB),
      });
    },
    addGameInProgress: (state, action: { payload: GameResultFromApi }) => {
      state.inProgress[action.payload.gameId] = {
        playerA: action.payload.playerA,
        playerB: action.payload.playerB,
        t: new Date().getTime(),
      };
    },
  },
});

export const { initialize, addGameInProgress, addResult } = resultSlice.actions;
export default resultSlice.reducer;
