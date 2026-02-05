import { useState } from "react";
import React from "react";
    



type Props = { pausado: boolean };




const Cronometro = ({ pausado }: Props) => {

    const [decimas, setDecimas] = useState(0);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
  return (
    <div>
      <h1>Cronómetro</h1>
      <h3>
        <span>{minutos > 9 ? minutos : `0${minutos}`} </span> : <span>{segundos > 9 ? segundos : `0${segundos}`}</span> : <span>{decimas > 9 ? decimas : `0${decimas}`}</span>
        <br />
        <button>Iniciar/Parar</button>
        <br />
        <button>Resetear</button>

      </h3>
    </div>
  );
};
export default Cronometro;