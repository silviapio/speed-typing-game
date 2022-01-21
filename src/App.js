import {useEffect, useState, useRef} from "react";
import StartingTimeBox from "./components/StartingTimeBox";
import './App.css';

function App() {
  const textareaRef = useRef(null);
  const [startingTime, setStartingTime] = useState(5)
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(startingTime);

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  const startGame = () => {
    setIsGameRunning(true);
    setSecondsLeft(startingTime);
    setTextInput("");
    textareaRef.current.disabled = false; // necessary to allow focus
    textareaRef.current.focus();
  }

  const getWordsCount = str => {
    const wordsArray = str.split(" ");
    return wordsArray.filter(item => item !== "").length;
  }

  const endGame = () => {
    setIsGameRunning(false);
    setWordCount(getWordsCount(textInput));
  }

  useEffect(() => {
    let timer;
    if (secondsLeft > 0 && isGameRunning) {
      timer = setTimeout(() => {
        setSecondsLeft(prevCount => prevCount - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      endGame();
      return function() {
        clearTimeout(timer);
      }
    }
  }, [secondsLeft, isGameRunning]);

  const handleEditStartingTime = (seconds) => {
    setStartingTime(seconds);
  }

  useEffect(() => setSecondsLeft(startingTime), [startingTime])

  return (
      <div>
          <h1>How fast do you type?</h1>
          <div className="seconds-allowed-container">
            <p>Seconds allowed: </p>
            <StartingTimeBox startingTime={startingTime} handleSubmitTime={handleEditStartingTime} changesForbidden={isGameRunning}/>
          </div>
           
                
          <textarea 
            value={textInput} 
            onChange={handleInput}
            disabled={!isGameRunning}
            ref={textareaRef}
          />
          <button 
            className="button--start"
            onClick={startGame} 
            disabled={isGameRunning}
          >
            Start
          </button>
          <h2>Word count: {wordCount}</h2>
          <h2>Seconds remaining: {secondsLeft}</h2>
      </div>
  );
}

export default App;
