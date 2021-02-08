import {useState, useEffect, useRef, useCallback} from 'react';
import Game from './Components/Game/index';
import './App.css';
import Counter from './Components/Counter';
import Winner from './Components/Winner';
import Welcome from './Components/Welcome';
import io from 'socket.io-client';
import Waiting from './Components/Waiting';

const ENDPOINT = "http://localhost:8080";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [targetText, setTargetText] = useState(true);
  const [waitingForPlayer, setWaitingForPlayer] = useState(false);
  const [channelId, setChannelId] = useState(true);
  const [socket, setSocket] = useState(true);
  const [coundownRunning, setCountDownRunning] = useState();
  const [gameRunning, setGameRunning] = useState();
  const [gameFinished, setGameFinished] = useState();
  const [startTime, setStartTime] = useState();
  const [winnerTime, setWinnerTime] = useState(null);
  const [winnerName, setWinnerName] = useState(null);
  const submitButtonRef = useRef();

  const handlePlayClick = useCallback(
    () => {
      setCountDownRunning(true);
      setShowWelcome(false);

      socket.emit('playClicked', {
        username : sessionStorage.getItem('username')
      })

    }, [setCountDownRunning, setShowWelcome, socket]
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
      let startTime = (new Date()).getTime();
      setStartTime(startTime);
    }, [setStartTime]
  );

  const onSubmitted = useCallback(
    () => {
      let endTime = (new Date()).getTime();
      setGameRunning(false);
      setGameFinished(true);

      socket.emit('gameSubmit', {
        username : sessionStorage.getItem('username'),
        channelId,
        time : (endTime - startTime)
      });

    }, [setGameRunning, setGameFinished, socket, startTime, channelId]
  );

  const welcomeProps = {
    handlePlayClick
  }

  const countdownProps = {
    onCountDownStart,
    onCountDownEnd
  }

  const gameProps = {
    onGameStarted,
    onSubmitted,
  }
  
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(submitButtonRef.current) {
        submitButtonRef.current.click();
        e.preventDefault();
        return;
      }
    }
  }

  useEffect(() => {
    const socket = io(ENDPOINT, {transports: ['websocket']});

    setSocket(socket);

    socket.on("connect", data => {
      console.log('socket connected@@@!!!')
    });
    
    socket.on("waitingForAnother", data => {
      setWaitingForPlayer(true);
      console.log('waitingForAnother');
      setChannelId(data['channelId']);
      setTargetText(data['targetText'])
    });
    
    socket.on("bothClientConnected", data => {
      setWaitingForPlayer(false)
      console.log('bothClientConnected');
      setChannelId(data['channelId']);
      setTargetText(data['targetText'])
    });

    socket.on("gameEnded", data => {
      setGameRunning(false);
      setGameFinished(true);
      setWinnerName(data['winner'])
      setWinnerTime(data['time'])
    });

    return () => {
      socket.disconnect()
      setSocket(null)
    }
  }, []);

  return (
    <div className="app-container" onKeyPress={handleEnter}>
      {
        showWelcome
        && <Welcome {...welcomeProps}/>
      }
      {
        waitingForPlayer
        && <Waiting />
      }
      {
        coundownRunning && !waitingForPlayer
        && <Counter {...countdownProps} />
      }
      {
        gameRunning
        && <Game {...{...gameProps, targetText}} ref={submitButtonRef} />
      }
      {
        gameFinished
        && <Winner {...{winnerName, winnerTime}} />
      }
    </div>
  );
}

export default App;
