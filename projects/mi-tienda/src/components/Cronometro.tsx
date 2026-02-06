import { useEffect, useState } from "react";
import React from "react";

type Props = { pausado: boolean };

const Cronometro = ({ pausado }: Props) => {
  //empezamos con el useState para las decimas, segundos y minutos, cada uno con su respectiva función para actualizar su valor
  const [decimas, setDecimas] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [funcionando, setFuncionando] = useState(!pausado);

  const handleClickInicio = () => {
    setFuncionando(!funcionando);
  };
  const handleClickReseteo = () => {
    setDecimas(0);
    setSegundos(0);
    setMinutos(0);
  };

  useEffect(() => {
    let intervalID: number | undefined;
    if (funcionando) {
      intervalID = setInterval(() => {
        if (decimas < 9) {
          setDecimas((prevDec) => prevDec + 1);
        }else if(decimas == 9 && segundos < 59){
          setDecimas(0);
          setSegundos((prevSeg) => prevSeg + 1);
        }else if(decimas == 9 && segundos == 59){
          setDecimas(0);
          setSegundos(0);
          setMinutos((prevMin) => prevMin + 1);
        }
      }, 100);
    } else {
      clearInterval(intervalID);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [decimas, segundos, minutos, funcionando]);

  return (
    <div>
      <h1>Cronómetro</h1>
      <h3>
        <span>{minutos > 9 ? minutos : `0${minutos}`} </span> :{" "}
        <span>{segundos > 9 ? segundos : `0${segundos}`}</span> :{" "}
        <span>{decimas > 9 ? decimas : `0${decimas}`}</span>
        <br />
        <button onClick={ handleClickInicio}>
          {funcionando ? "Parar" : "Iniciar"}
        </button>
        <br />
        <button onClick={ handleClickReseteo}>Resetear</button>
      </h3>
    </div>
  );
};
export default Cronometro;
