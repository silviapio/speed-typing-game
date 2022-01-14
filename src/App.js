import {useState} from "react";
import './App.css';

function App() {
  const [textInput, setTextInput] = useState("");

  const handleInput = event => {
    setTextInput(event.target.value);
  }

  const getWordsCount = str => {
    const wordsArray = str.split(" ");
    return wordsArray.filter(item => item !== "").length;
  }

  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea 
            value={textInput} 
            onChange={handleInput} 
          />
          <h4>Time reminaing: ???</h4>
          <button onClick={() => console.log(getWordsCount(textInput))}>Start</button>
          <h1>Word count: ???</h1>
      </div>
  )
}

export default App
