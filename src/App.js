import {useState, useEffect, useRef, useCallback} from 'react';
import Game from './Components/Game/index';
import './App.css';
import getDummyData from './util/dummyData';
import Counter from './Components/Counter';
import Winner from './Components/Winner';
import Welcome from './Components/Welcome';

function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [coundownRunning, setCountDownRunning] = useState();
  const [gameRunning, setGameRunning] = useState();
  const [gameFinished, setGameFinished] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const submitButtonRef = useRef();

  const handlePlayClick = useCallback(
    () => {
      setCountDownRunning(true);
      setShowWelcome(false)
    }, [setCountDownRunning, setShowWelcome]
  );

  const onCountDownStart = useCallback(
    () => {
      setCountDownRunning(true);
    }, [setCountDownRunning]
  );
  
  const onCountDownEnd = useCallback(
    () => {
      setCountDownRunning(false);
      setGameRunning(true);
    }, [setCountDownRunning, setGameRunning]
  );

  const onGameStarted = useCallback(
    () => {
      setStartTime((new Date()).getTime());
    }, [setStartTime]
  );

  const onSubmitted = useCallback(
    () => {
      setEndTime((new Date()).getTime());
      setGameRunning(false);
      setGameFinished(true);
    }, [setEndTime, setGameRunning, setGameFinished]
  );

  const welcomeProps = {
    handlePlayClick
  }

  const countdownProps = {
    onCountDownStart,
    onCountDownEnd
  }

  const gameProps = {
    targetText : getDummyData(),
    onGameStarted,
    onSubmitted,
  }
  
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      submitButtonRef.current.click();
      e.preventDefault();
      return;
    }
  }

  return (
    <div className="app-container" onKeyPress={handleEnter}>
      {
        showWelcome
        && <Welcome {...welcomeProps}/>
      }
      {
        coundownRunning
        && <Counter {...countdownProps} />
      }
      {
        gameRunning
        && <Game {...gameProps} ref={submitButtonRef} />
      }
      {
        gameFinished
        && <Winner {...{endTime, startTime}} />
      }
    </div>
  );
}

export default App;
