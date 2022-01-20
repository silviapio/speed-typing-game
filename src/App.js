import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(10);

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  // const getWordsCount = str => {
  //   const wordsArray = str.split(" ");
  //   return wordsArray.filter(item => item !== "").length;
  // }

  useEffect(() => {
    let timer;
    if (secondsLeft > 0 && isGameRunning) {
      timer = setTimeout(() => {
        setSecondsLeft(prevCount => prevCount - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setIsGameRunning(false);
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
          />
          <h4>Time remaining: {secondsLeft}</h4>
          <button onClick={() => setIsGameRunning(true)}>Start</button>
          <h1>Word count: ???</h1>
      </div>
  )
}

export default App
