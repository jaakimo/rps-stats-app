/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface Player {
  name: string;
  played: string;
}

export interface GameResults {
  [id: string]: {
    t: number;
    type: string;
    playerA: Player;
    playerB: Player;
  };
}

export interface GameResultFromApi {
  gameId: string;
  t: number;
  type: string;
  playerA: Player;
  playerB: Player;
}
const initialState: GameResults = {};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    initialize: (state, { payload }: { payload: GameResultFromApi[] }) => {
      return payload.reduce((memo, game) => {
        return {
          ...memo,
          [game.gameId]: {
            t: game.t,
            type: game.type,
            playerA: game.playerA,
            playerB: game.playerB,
          },
        };
      }, {});
    },

    add: (state, { payload }: { payload: GameResultFromApi }) => {
      state[payload.gameId] = {
        t: payload.t,
        type: payload.type,
        playerA: payload.playerA,
        playerB: payload.playerB,
      };
    },
  },
});

export const { initialize } = gamesSlice.actions;
export default gamesSlice.reducer;
