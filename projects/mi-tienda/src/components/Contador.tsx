import React, { useState } from "react";

const Contador = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Contador: {count} veces pulsado </h2>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Incrementar</button>
      <button className="btn btn-secondary" onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
};

export default Contador;
