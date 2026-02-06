import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      // OJO: Usamos la "functional update" (prev => prev + 1)
      // Si usáramos 'seconds + 1', se quedaría atascado en 1 por el cierre (closure).
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Esto es OBLIGATORIO con setInterval / addEventListener
    return () => {
      console.log("🔴 Componente destruido. Limpiando intervalo...");
      clearInterval(intervalId);
    };
  }, []); // Array vacío = Solo se ejecuta 1 vez al nacer el componente

  return (
    <div className="counter-card" style={{ marginTop: '20px', background: '#2c3e50', color: 'white' }}>
      <h3>Timer (useEffect)</h3>
      <div className="counter-display" style={{ color: '#f1c40f' }}>
        {seconds} s
      </div>
    </div>
  );
};

export default Timer;