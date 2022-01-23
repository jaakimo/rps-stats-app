import { useAppSelector } from '../app/hooks';
import MatchResult from './MatchResult';

const MatchResults = () => {
  const results = useAppSelector((state) => state.resultReducer.completed);

  // const resultsSortedByTimeArray = results.sort((a, b) => a.t - b.t);
  return (
    <div className="container">
      <h3>history</h3>
      {results.map((result) => (
        <MatchResult result={result} key={result.gameId} />
      ))}
    </div>
  );
};

export default MatchResults;
