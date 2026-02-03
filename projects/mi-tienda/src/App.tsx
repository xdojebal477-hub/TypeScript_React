import Alert from './components/Alert';
import Contador from './components/Contador';
import ProductCard from './components/ProductCard';
import UserProfile from './components/UserProfile';
import Accordion from './components/Accordion';

import Tab from './components/Tab';
function App() {
   const tabData = [
    { id: '1', label: 'Inicio', content: 'Contenido principal...' },
    { id: '2', label: 'Detalles', content: 'Especificaciones técnicas...' },
  ];
  return (
    <>
    <div className="container">
      <h1>Panel de Control</h1>
      
      <section>
        <h2>Sistema de Alertas</h2>
        <Alert type="error" message="Error de conexión" />
        <Alert type="warning" message="Sesión a punto de caducar" /*showIcon={true}*/ />
        <Alert type="info" message="Bienvenido al curso de React" />
      </section>
    </div>
    <div className="grid">
  <ProductCard
    title="Zapatillas Runner X"
    price={89.90}
    image="https://placehold.co/300x200/orange/white?text=Sneakers"
    inStock={true}
    isNew={true}
  />
  <ProductCard
    title="Monitor 4K Ultra"
    price={299.50}
    image="https://placehold.co/300x200/333/white?text=Screen"
    inStock={false}
  />
</div>
    <div className='grid'>
      <UserProfile userData={{
        username: "Juan Pérez",
        email: "juan.perez@example.com",
        avatar: "https://via.placeholder.com/100",
        role: "admin"
      }} />
      <UserProfile userData={{
        username: "María López",
        email: "maria.lopez@example.com",
        avatar: "https://via.placeholder.com/100",
        role: "user"
      }} />
    </div>
    <Contador />
    <Accordion title="¿Qué es el estado?">
      <p>El estado es la memoria interna de un componente React.</p>
    </Accordion>
    <Tab items={tabData} />
    </>
  );
}

export default App;