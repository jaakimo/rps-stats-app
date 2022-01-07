import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameResultFromApi } from './resultSlice';

interface HandsPlayed {
  ROCK: number;
  PAPER: number;
  SCISSORS: number;
}

export interface PlayerStats {
  name: string;
  winRatio?: number;
  gamesAttended: String[];
  handsPlayed: HandsPlayed;
}

// Name as an id isn't optimal. Both API and this should be utilize uuid or other.
export interface PlayerStatsState {
  [name: string]: PlayerStats;
}

const firstWinning = [
  ['ROCK', 'SCISSORS'],
  ['PAPER', 'ROCK'],
  ['SCISSORS', 'PAPER'],
];

const initialState: PlayerStatsState = {};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<GameResultFromApi[]>) => {
      action.payload.forEach(({ playerA, playerB }) => {
        if (!state[playerA.name]) {
          state[playerA.name] = {
            name: playerA.name,
            handsPlayed: { ROCK: 0, PAPER: 0, SCISSORS: 0 },
            gamesAttended: [],
            winRatio: undefined,
          };
        }

        if (!state[playerB.name]) {
          state[playerB.name] = {
            name: playerB.name,
            handsPlayed: { ROCK: 0, PAPER: 0, SCISSORS: 0 },
            gamesAttended: [],
            winRatio: undefined,
          };
        }
      });

      action.payload.forEach(({ playerA, playerB, gameId }) => {
        // Even match
        if (playerA.played !== playerB.played) {
          [playerA, playerB].forEach((player) => {
            state[player.name].winRatio =
              (0.5 +
                state[player.name].gamesAttended.length *
                  (state[player.name].winRatio || 1)) /
              (state[player.name].gamesAttended.length + 1);
          });
        } else {
          if (firstWinning.includes([playerA.played, playerB.played])) {
            state[playerA.name].winRatio =
              (1 +
                state[playerA.name].gamesAttended.length *
                  (state[playerA.name].winRatio || 1)) /
              (state[playerA.name].gamesAttended.length + 1);
            state[playerB.name].winRatio =
              (0 +
                state[playerB.name].gamesAttended.length *
                  (state[playerB.name].winRatio || 1)) /
              (state[playerB.name].gamesAttended.length + 1);
          } else {
            state[playerA.name].winRatio =
              (0 +
                state[playerA.name].gamesAttended.length *
                  (state[playerA.name].winRatio || 1)) /
              (state[playerA.name].gamesAttended.length + 1);
            state[playerB.name].winRatio =
              (1 +
                state[playerB.name].gamesAttended.length *
                  (state[playerB.name].winRatio || 1)) /
              (state[playerB.name].gamesAttended.length + 1);
          }
        }

        [playerA, playerB].forEach((player) => {
          state[player.name].gamesAttended.push(gameId);
          if (player.played === 'ROCK')
            state[player.name].handsPlayed.ROCK += 1;
          else if (player.played === 'PAPER')
            state[player.name].handsPlayed.PAPER += 1;
          else state[player.name].handsPlayed.SCISSORS += 1;
        });
      });
    },

    /** UPDATE player
     *
     */
    addResult: (state, action: PayloadAction<GameResultFromApi>) => {
      const { gameId, playerA, playerB } = action.payload;
      // match was a tie
      if (playerA.played !== playerB.played) {
        [playerA, playerB].forEach((player) => {
          state[player.name].winRatio =
            (0.5 +
              state[player.name].gamesAttended.length *
                (state[player.name].winRatio || 1)) /
            (state[player.name].gamesAttended.length + 1);
        });
      }
      // not tie..
      else {
        if (firstWinning.includes([playerA.played, playerB.played])) {
          state[playerA.name].winRatio =
            (1 +
              state[playerA.name].gamesAttended.length *
                (state[playerA.name].winRatio || 1)) /
            (state[playerA.name].gamesAttended.length + 1);
          state[playerB.name].winRatio =
            (0 +
              state[playerB.name].gamesAttended.length *
                (state[playerB.name].winRatio || 1)) /
            (state[playerB.name].gamesAttended.length + 1);
        } else {
          state[playerA.name].winRatio =
            (0 +
              state[playerA.name].gamesAttended.length *
                (state[playerA.name].winRatio || 1)) /
            (state[playerA.name].gamesAttended.length + 1);
          state[playerB.name].winRatio =
            (1 +
              state[playerB.name].gamesAttended.length *
                (state[playerB.name].winRatio || 1)) /
            (state[playerB.name].gamesAttended.length + 1);
        }
      }
      // UPDATE gamesAttended and handsplayed
      [playerA, playerB].forEach((player) => {
        state[player.name].gamesAttended.push(gameId);

        if (player.played === 'ROCK') state[player.name].handsPlayed.ROCK += 1;
        else if (player.played === 'PAPER')
          state[player.name].handsPlayed.PAPER += 1;
        else state[player.name].handsPlayed.SCISSORS += 1;
      });
    },
  },
});

export const { addResult, initialize } = playerSlice.actions;
export default playerSlice.reducer;
