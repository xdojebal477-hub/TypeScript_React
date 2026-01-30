import Micomponente from "./Micomponente";


interface SaludoProps {
  nombre?: string;
  apellido?: string;
  edead?: number;
}

const Saludo = ({nombre, apellido, edead}: SaludoProps) => {
  return (
    <>
    <Micomponente />
    <h2>Hola {nombre} {apellido}, tienes {edead} años</h2>
    <div>Saludo</div>
    <Micomponente />

    </>
  )
};

export default Saludo;
