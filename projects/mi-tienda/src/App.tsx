import Alert from "./components/Alert";
import Contador from "./components/Contador";
import ProductCard from "./components/ProductCard";
import UserProfile from "./components/UserProfile";
import Accordion from "./components/Accordion";
import Cronometro from "./components/Cronometro";
import Tab from "./components/Tab";
import Timer from "./components/Timer";
import { useState } from "react";
import VideoReproductor from "./components/VideoReproductor";

function App() {
  const tabData = [
    { id: "1", label: "Inicio", content: "Contenido principal..." },
    { id: "2", label: "Detalles", content: "Especificaciones técnicas..." },
  ];

  const [showTimer, setShowTimer] = useState(true);
  return (
    <>
      <div className="container">
        <h1>Panel de Control</h1>

        <section>
          <h2>Sistema de Alertas</h2>
          <Alert type="error" message="Error de conexión" />
          <Alert
            type="warning"
            message="Sesión a punto de caducar" /*showIcon={true}*/
          />
          <Alert type="info" message="Bienvenido al curso de React" />
        </section>
      </div>
      <div className="grid">
        <ProductCard
          title="Zapatillas Runner X"
          price={89.9}
          image="https://placehold.co/300x200/orange/white?text=Sneakers"
          inStock={true}
          isNew={true}
        />
        <ProductCard
          title="Monitor 4K Ultra"
          price={299.5}
          image="https://placehold.co/300x200/333/white?text=Screen"
          inStock={false}
        />
      </div>
      <div className="grid">
        <UserProfile
          userData={{
            username: "Juan Pérez",
            email: "juan.perez@example.com",
            avatar: "https://via.placeholder.com/100",
            role: "admin",
          }}
        />
        <UserProfile
          userData={{
            username: "María López",
            email: "maria.lopez@example.com",
            avatar: "https://via.placeholder.com/100",
            role: "user",
          }}
        />
      </div>
      <Contador />
      <Accordion title="¿Qué es el estado?">
        <p>El estado es la memoria interna de un componente React.</p>
      </Accordion>
      <Tab items={tabData} />

      <hr />
      <Cronometro pausado={true} />

      {/*<hr />
    <Cronometro2 />
    */}
      <hr />
      <br />
      <section className="text-center mb-2">
        <button
          className="btn btn-primary"
          onClick={() => setShowTimer(!showTimer)}
        >
          {showTimer ? "Ocultar" : "Mostrar"} Cronómetro
        </button>

        {showTimer && <Timer />}
      </section>


      <hr />
      <br />
      
      <VideoReproductor src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"/>
    </>
  );
}

export default App;
