import {useEffect, useState} from "react";
import './App.css';

function App() {
  const STARTING_TIME = 5;
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(STARTING_TIME);

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  const startGame = () => {
    setIsGameRunning(true);
    setSecondsLeft(STARTING_TIME);
    setTextInput("");
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

  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea 
            value={textInput} 
            onChange={handleInput}
            disabled={!isGameRunning}
          />
          <h4>Time remaining: {secondsLeft}</h4>
          <button 
            onClick={startGame} 
            disabled={isGameRunning}
          >
            Start
          </button>
          <h1>Word count: {wordCount}</h1>
      </div>
  )
}

export default App
