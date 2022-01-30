import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { initialize as initializePlayers } from './app/state/playerSlice';
import { initialize as initializeResults } from './app/state/resultSlice';
import MatchResults from './components/MatchResults';

import './App.scss';
import axios from 'axios';
import LiveResults from './components/LiveResults';

// TODO - Fix duplicate key error, Tests, Player information routing

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      await import('./app/socketClient');
    })();
    axios
      .get('https://rps-stats-api.herokuapp.com/api/rps/history')
      .then(({ data }) => {
        dispatch(initializeResults(data.data));
        dispatch(initializePlayers(data.data));
      })
      .catch((err) =>
        console.log('Error - could not connect to api: ', err.message),
      );
  }, [dispatch]);

  return (
    <div className="container">
      <header className="py-4 pb-3 mb-4 border-bottom">
        <a href="/" className="text-dark text-decoration-none">
          <h1 className="text-center">RPS-stats app</h1>
        </a>
      </header>
      <main className="">
        <LiveResults />
        <MatchResults />
      </main>
    </div>
  );
}

export default App;
