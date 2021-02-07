import {useState, useEffect, useRef} from 'react';
import Game from './Components/Game/index';
import './App.css';
import getDummyData from './dummyData';
// import Counter from './Components/Counter';

function App() {

  const [counter, setCounter] = useState(3);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const submitButtonRef = useRef();

  const onSubmitted = () => {
    setEndTime((new Date()).getTime());
  }

  let gameProps = {
    targetText : getDummyData(),
    onSubmitted
  }

  useEffect(() => {
    setStartTime((new Date()).getTime());
  }, []);

  useEffect(() => {
    console.log(startTime, endTime)
  }, [startTime, endTime])
  
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (counter > 0) {
          setCounter(counter - 1);
      }
      if (counter === 0) {
          clearInterval(myInterval)
      } 
    }, 1000)
    console.log(myInterval);
    return ()=> {
      clearInterval(myInterval);
    };
  }, [counter]);
  
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      submitButtonRef.current.click();
      e.preventDefault();
      return;
    }
  }

  const getFormmattedTime = (msTime) => {
    return `${Math.floor(msTime / 1000)}s ${Math.floor(msTime % 1000)}ms`;
  }
  
  return (
    <div className="app-container" onKeyPress={handleEnter}>
      {
        counter > 0
        ? (
          <div className="counter-container">
            {counter}
          </div>
        )
        : (
          !endTime 
          ? <Game {...gameProps} ref={submitButtonRef} />
          : <div className="result-container">Winner {getFormmattedTime(endTime - startTime)}</div>
        )
      }
    </div>
  );
}

export default App;
