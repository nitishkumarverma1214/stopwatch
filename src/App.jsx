import { useState, useEffect, useRef } from "react";
import "./App.css";

const clockState = {
  STOP: "stop",
  START: "start",
  RESET: "reset",
};

export function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timmer = useRef("");
  useEffect(() => {
    if (isRunning) {
      timmer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      return () => clearInterval(timmer.current);
    }
  }, [isRunning]);

  const handleTimmer = (state) => {
    switch (state) {
      case clockState.START:
        setIsRunning(true);
        break;

      case clockState.STOP:
        setIsRunning(false);
        clearInterval(timmer.current);
        break;

      case clockState.RESET:
        setIsRunning(false);
        clearInterval(timmer.current);
        setTime(0);
        break;
    }
  };

  return (
    <div className="App">
      <h1>React Stopwatch</h1>
      <div className="clock">
        <div className="clock__inner-ring">
          <p className="clock__time">
            {(Math.trunc(time / 3_600_000) % 24).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {(Math.trunc(time / 60_000) % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            <span className="clock_time--second">
              {(Math.trunc(time / 1_000) % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            </span>
            .
            <span className="clock_time--ms">
              {(time % 100).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            </span>
          </p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={() => handleTimmer(clockState.START)}>Start</button>
        <button onClick={() => handleTimmer(clockState.STOP)}>Stop</button>
        <button onClick={() => handleTimmer(clockState.RESET)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
