import { store } from './state/store';
import {
  addGameInProgress,
  addResult,
  GameResultFromApi,
} from './state/resultSlice';
import { updatePlayerStats } from './state/playerSlice';

const URI = 'wss://bad-api-assignment.reaktor.com/rps/live';

export const socket = new WebSocket(URI);

socket.onopen = () => {
  console.log('websocket opened');
};
socket.onmessage = (message) => {
  const gameData: GameResultFromApi = JSON.parse(JSON.parse(message.data));
  if (gameData.type === 'GAME_BEGIN') {
    store.dispatch(addGameInProgress(gameData));
  }
  if (gameData.type === 'GAME_RESULT') {
    store.dispatch(addResult(gameData));
    store.dispatch(updatePlayerStats(gameData));
  }
};
