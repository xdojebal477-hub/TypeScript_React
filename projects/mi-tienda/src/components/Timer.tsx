import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // iniciamos el interval para que cada segundo se actualice el estado de seconds
    const intervalID = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID); //evitamos memory leaks
    };
  }, []);

  return (
    <div className="timer-container">
      <h3>Cronometro</h3>
      <div className="timer-display">
        <span>{seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
