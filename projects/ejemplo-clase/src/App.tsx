import Micomponente from "./components/Micomponente";
import Saludo from "./components/Saludo";

function App() {
  return (
    <>
      <Micomponente />
      <h1>Hola Mundo desde React y Vite</h1>
      <Micomponente />
      <Saludo nombre="Juan" apellido="Pérez" edead={25}></Saludo>
    </>
  );
}

export default App;
