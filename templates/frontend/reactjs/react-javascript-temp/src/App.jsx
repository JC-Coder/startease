import { useState } from "react";
import reactLogo from "./assets/react.svg";
import StartEaseLogo from "/startease.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://github.com/JC-Coder/startease" target="_blank">
          <img src={StartEaseLogo} className="logo" alt="StartEase logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>StartEase + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the StartEase and React logos to learn more
      </p>
    </>
  );
}

export default App;
