import axios from 'axios';
import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { initialize as initializePlayers } from './app/state/playerSlice';
import { initialize as initializeResults } from './app/state/resultSlice';
import data from './data.json';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeResults(data.data.slice(0, 10)));
    dispatch(initializePlayers(data.data.slice(0, 10)));
  }, []);

  return <div className="App">hello</div>;
}

export default App;
