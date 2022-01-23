import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { winningPlayer } from '../../utils/functions';
import { GameResultFromApi, Player } from './resultSlice';

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

// Name as an id isn't optimal. Both API could utilize uuid or other.
export interface PlayerStatsState {
  [name: string]: PlayerStats;
}

const initialState: PlayerStatsState = {};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<GameResultFromApi[]>) => {
      action.payload.forEach((payload) => {
        updateStats(state, payload);
      });
    },

    updatePlayerStats: (state, action: { payload: GameResultFromApi }) => {
      updateStats(state, action.payload);
    },
  },
});

const updateStats = (state: PlayerStatsState, payload: GameResultFromApi) => {
  // initialize player stats if players do not exist yet
  if (!state[payload.playerA.name]) {
    state[payload.playerA.name] = {
      name: payload.playerA.name,
      handsPlayed: { ROCK: 0, PAPER: 0, SCISSORS: 0 },
      gamesAttended: [],
      winRatio: undefined,
    };
  }
  if (!state[payload.playerB.name]) {
    state[payload.playerB.name] = {
      name: payload.playerB.name,
      handsPlayed: { ROCK: 0, PAPER: 0, SCISSORS: 0 },
      gamesAttended: [],
      winRatio: undefined,
    };
  }
  /**
   *
   * @param newValue match result win -> 1 lose -> 0 tie - 0.5
   * @param n number of matches played
   * @param average average before new result
   * @returns
   */
  const getNewMovingAverage = (
    newValue: number,
    n: number,
    average?: number,
  ): number => {
    return (newValue + n * (average || 1)) / (n + 1);
  };

  const winner = winningPlayer(payload.playerA, payload.playerB);
  // TIE
  if (!winner) {
    [payload.playerA, payload.playerB].forEach((player) => {
      state[player.name].winRatio = getNewMovingAverage(
        0.5,
        state[player.name].gamesAttended.length,
        state[player.name].winRatio,
      );
    });
  }
  // NOT TIE
  else if (winner === 'A') {
    state[payload.playerA.name].winRatio = getNewMovingAverage(
      1,
      state[payload.playerA.name].gamesAttended.length,
      state[payload.playerA.name].winRatio,
    );
    state[payload.playerB.name].winRatio = getNewMovingAverage(
      0,
      state[payload.playerA.name].gamesAttended.length,
      state[payload.playerA.name].winRatio,
    );
  } else {
    state[payload.playerA.name].winRatio = getNewMovingAverage(
      0,
      state[payload.playerA.name].gamesAttended.length,
      state[payload.playerA.name].winRatio,
    );
    state[payload.playerB.name].winRatio = getNewMovingAverage(
      1,
      state[payload.playerA.name].gamesAttended.length,
      state[payload.playerA.name].winRatio,
    );
  }
  // update played hands
  [payload.playerA, payload.playerB].forEach((player) => {
    state[player.name].gamesAttended.push(payload.gameId);
    if (player.played === 'ROCK') state[player.name].handsPlayed.ROCK += 1;
    else if (player.played === 'PAPER')
      state[player.name].handsPlayed.PAPER += 1;
    else state[player.name].handsPlayed.SCISSORS += 1;
  });
};

export const { updatePlayerStats, initialize } = playerSlice.actions;
export default playerSlice.reducer;
