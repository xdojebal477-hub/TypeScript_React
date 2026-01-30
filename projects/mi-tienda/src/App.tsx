import Alert from './components/Alert';

function App() {
  return (
    <>
    <div className="container">
      <h1>Panel de Control</h1>
      
      <section>
        <h2>Sistema de Alertas</h2>
        <Alert type="error" message="Error de conexión" />
        <Alert type="warning" message="Sesión a punto de caducar" /*showIcon={true}*/ />
      </section>
    </div>
    </>
  );
}

export default App;