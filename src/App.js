import {useEffect, useState, useRef} from "react";
import './App.css';

function App() {
  const STARTING_TIME = 5;
  const textareaRef = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(STARTING_TIME);

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  const startGame = () => {
    setIsGameRunning(true);
    setSecondsLeft(STARTING_TIME);
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

  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea 
            value={textInput} 
            onChange={handleInput}
            disabled={!isGameRunning}
            ref={textareaRef}
          />
          <button 
            onClick={startGame} 
            disabled={isGameRunning}
          >
            Start
          </button>
          <h2>Word count: {wordCount}</h2>
          <h2>Time remaining: {secondsLeft}</h2>
      </div>
  );
}

export default App;
