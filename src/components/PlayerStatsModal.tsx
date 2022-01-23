import React from 'react';
import { useAppSelector } from '../app/hooks';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
interface Props {
  show: boolean;
  playerSelected: string;
  setPlayerSelected: (name: string) => void;
}

const PlayerStatsModal = ({
  show,
  playerSelected,
  setPlayerSelected,
}: Props) => {
  const state = useAppSelector((state) => state.playerReducer);
  if (!playerSelected) return null;
  const player = state[playerSelected];
  const handleClose = () => {
    setPlayerSelected('');
  };

  // TODO - fix edge case when two or more hands are equally most played
  const mostPlayedHand = Object.entries(player.handsPlayed).reduce(
    (prev, hand) => {
      if (hand[1] > prev[1]) return hand;
      else return prev;
    },
    ['', 0],
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{player.name}'s stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Win ratio:{' '}
          {player.winRatio
            ? (player.winRatio * 100).toFixed() + ' %'
            : 'Player has not played games yet'}
        </p>
        <p>Games played: {player.gamesAttended.length}</p>
        <p>
          Most played hand:{' '}
          <i
            className={`px-1 fas fa-hand-${mostPlayedHand[0].toLowerCase()} fa-2x`}
          />
          -{' ('}
          {(
            (mostPlayedHand[1] / player.gamesAttended.length) *
            100
          ).toFixed()}{' '}
          %)
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerStatsModal;
