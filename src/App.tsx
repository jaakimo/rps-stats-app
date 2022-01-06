import axios from 'axios';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://bad-api-assignment.reaktor.com/rps/history',
        );
        console.log(`data`, data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
