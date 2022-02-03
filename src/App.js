import {useEffect, useState, useRef} from "react";
import StartingTimeBox from "./components/StartingTimeBox";
import {HiRefresh} from "react-icons/hi";
import './App.css';

function App() {
  const textareaRef = useRef(null);
  const [startingTime, setStartingTime] = useState(5);
  const [currentTimer, setCurrentTimer] = useState("");
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(startingTime);
  const [bestScore, setBestScore] = useState( JSON.parse(localStorage.getItem("bestScore")) || "" );
  const [gameStopped, setGameStopped] = useState(false);

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

  const getWordsPerMinute = (numOfWords, seconds) => {
    const multiplier = 60 / seconds;
    return Math.floor(numOfWords * multiplier);
  }

  const getValidWordCount = async str => {
    if (textInput === "") {
      return 0;
    }
    const wordsArray = str.split(" ");
    const validWordsCount = [];
    for (const word of wordsArray) {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (res.ok) {
        validWordsCount.push(word);
      }
    }
    return validWordsCount.length;
  }

  const endGame = async () => {
    setIsGameRunning(false);
    const validWordCount = await getValidWordCount(textInput);
    setWordCount(validWordCount);
  }

  useEffect(() => {
    let timer;
    if (secondsLeft > 0 && isGameRunning) {
      timer = setTimeout(() => {
        setSecondsLeft(prevCount => prevCount - 1)
      }, 1000)
      setCurrentTimer(timer);
    } else if (secondsLeft === 0) {
      endGame();
      return function() {
        clearTimeout(currentTimer);
        setCurrentTimer("");
      }
    }
  }, [secondsLeft, isGameRunning]);

  useEffect(() => {
    if (wordCount === 0) {
      return;
    } 
    const wordsPerMin = getWordsPerMinute(wordCount, startingTime);
    if (bestScore < wordsPerMin) {
      setBestScore(wordsPerMin)
      localStorage.setItem("bestScore", wordsPerMin);
    } 
  }, [wordCount])

  const handleEditStartingTime = (seconds) => {
    setStartingTime(seconds);
  }

  const handleReset = () => {
    if (isGameRunning) {
      clearTimeout(currentTimer);
      setGameStopped(true);
      setCurrentTimer("");
      setIsGameRunning(false);
    } else {
      setSecondsLeft(startingTime);
      setGameStopped(false);
      setWordCount(0);
      setTextInput("");
    }    
  }

  return (
      <div>
          <h1>How fast do you type?</h1>
          <div className="seconds-allowed-container">
            <p>Seconds allowed: </p>
            <StartingTimeBox startingTime={startingTime} handleSubmitTime={handleEditStartingTime} changesForbidden={isGameRunning || gameStopped}/>
          </div>
           
                
          <textarea 
            value={textInput} 
            onChange={handleInput}
            disabled={!isGameRunning}
            ref={textareaRef}
          />
          <div className="start-reset-container">
            <button 
              className="button--start"
              onClick={startGame} 
              disabled={isGameRunning}
            >
              Start
            </button>
            <button 
              className="button--reset"
              onClick={handleReset}
              >
                <HiRefresh />
            </button>
          </div>
          <h2>Seconds remaining: {secondsLeft}</h2>
          {gameStopped ? 
            <h3 className="message--game-stopped">Sorry, we don't count words when game is stopped!</h3> :
            <>
              <h2 className="message--words">Valid words typed: {wordCount}</h2>
              <h3 className="message--words">Words per minute: {getWordsPerMinute(wordCount, startingTime)}</h3>
            </>
          }          
          {bestScore && <h3 className="message--words--best-score">^^^ Best score: {bestScore} w/min ^^^</h3>}
          
      </div>
  );
}

export default App;
