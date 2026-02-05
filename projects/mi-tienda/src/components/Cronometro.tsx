import React from "react";

type Props = { pausado: boolean };

useEffect(() => {
  first

  return () => {
    second
  }
}, [third])


const Cronometro = ({ pausado }: Props) => {
  return (
    <div>
      <h1>Cronómetro</h1>
      <h3>
        <span>Minutos </span> : <span> Segundos </span> : <span> Decimas </span>
        <br />
        <button>Iniciar/Parar</button>
        <br />
        <button>Resetear</button>

      </h3>
    </div>
  );
};
export default Cronometro;