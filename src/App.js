import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [textInput, setTextInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(10);

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  const getWordsCount = str => {
    const wordsArray = str.split(" ");
    return wordsArray.filter(item => item !== "").length;
  }

  useEffect(() => {
    let timer;
    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(prevCount => prevCount - 1)
      }, 1000)
    } else {
      return function() {
        clearTimeout(timer);
      }
    }
  }, [secondsLeft])

  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea 
            value={textInput} 
            onChange={handleInput} 
          />
          <h4>Time reminaing: {secondsLeft}</h4>
          <button onClick={() => console.log(getWordsCount(textInput))}>Start</button>
          <h1>Word count: ???</h1>
      </div>
  )
}

export default App
