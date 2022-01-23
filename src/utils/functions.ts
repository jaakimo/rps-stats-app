import { Player } from '../app/state/resultSlice';

export const winningPlayer = (
  playerA: Player,
  playerB: Player,
): 'A' | 'B' | undefined => {
  const firstWinning = [
    ['ROCK', 'SCISSORS'],
    ['PAPER', 'ROCK'],
    ['SCISSORS', 'PAPER'],
  ];

  if (playerA.played !== playerB.played) {
    if (
      firstWinning.some(
        (arr) => playerA.played === arr[0] && playerB.played === arr[1],
      )
    ) {
      return 'A';
    } else return 'B';
  }
  return undefined;
};

export const getTimeStringSince = (t: number): string => {
  let timeSinceInSeconds = (new Date().getTime() - t) / 1000;
  const days = Math.floor(timeSinceInSeconds / (3600 * 24));
  timeSinceInSeconds -= 3600 * 24 * days;
  const hours = Math.floor(timeSinceInSeconds / 3600);
  timeSinceInSeconds -= 3600 * hours;
  const minutes = Math.floor(timeSinceInSeconds / 60);
  let result = '';
  if (days > 0) result += `${days} days, `;
  if (hours > 0) result += `${hours} hours, `;
  if (minutes > 0) result += `${minutes} minutes ago.`;
  return result || 'Just now';
};
