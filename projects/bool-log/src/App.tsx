import { mockData } from "./mockData"; // Importamos los datos falsos
import type { BookLog } from "./types"; // Importamos el tipo de datos
import BookLogList from "./components/BookLogList";

function App() {
  // FASE 2: MAQUETA ESTÁTICA
  // No usamos useState todavía, pasamos los datos "a pelo"
  const books = mockData;

  return (
    <div className="container">
      <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          📚 BookLog <span style={{ fontSize: '0.6em', color: '#666' }}>Gestión de Biblioteca</span>
        </h1>
      </header>

      <main>
        {/* Sección del Formulario (Placeholder para Fase 3) */}
        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <h2 style={{ marginTop: 0 }}>Nuevo Libro</h2>
          <p style={{ color: '#666' }}>Aquí irá el formulario en la siguiente fase...</p>
        </section>

        {/* Sección de la Lista */}
        <section>
          <h2 style={{ marginBottom: '20px' }}>Catálogo Actual</h2>
          <BookLogList items={books} />
        </section>
      </main>
    </div>
  );
}

export default App;