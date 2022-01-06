/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type Hand = 'ROCK' | 'PAPER' | 'SCISSORS';

interface Player {
  name: string;
  played: Hand;
}

export interface GameResults {
  [id: string]: {
    t: number;
    type: string;
    playerA: Player;
    playerB: Player;
  };
}

interface GameResultsFromApi {
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
    initialize: (state, { payload }: { payload: GameResultsFromApi[] }) => {
      payload.forEach((game) => {
        state[game.gameId] = {
          t: game.t,
          type: game.type,
          playerA: game.playerA,
          playerB: game.playerB,
        };
      });

      // state = payload.reduce(
      //   (memo, game) => ({
      //     ...memo,
      //     [game.gameId]: {
      //       t: game.t,
      //       type: game.type,
      //       playerA: game.playerA,
      //       playerB: game.playerB,
      //     },
      //   }),
      //   {}
      // );
    },
    add: (state, { payload }: { payload: GameResultsFromApi }) => {
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
