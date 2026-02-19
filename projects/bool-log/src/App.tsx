import { useEffect, useState } from "react";
import { mockData } from "./mockData";
import type { BookLog } from "./types";
import BookLogList from "./components/BookLogList";
import { BookLogForm } from "./components/BookLogForm";
import { getBooks,addBookLog,deleteBookLog } from "./serviceFireBase";
;

function App() {
  //fase reactiva de la app, cuando 
  const [booklogs,setBookLogs]=useState<BookLog[]>(mockData);
  const [isLoading,setIsLoading]=useState(true);
  const [error, setError] = useState<string | null>(null);


  //ahora usamos useEffect, en este caso para ejecutar una vez al montar el componente para cargar los datos de firebase
  useEffect(()=>{
    async function loadBookLogs(){
      try{
        setIsLoading(false);
        const booklogsFirebase=await getBooks();
        setBookLogs(booklogsFirebase);
      }
      catch(error){
        console.log(`Error al cargar los libros ${error}`)
        setError("Error al cargar los libros");
      }
      finally{
        setIsLoading(false);
      }
    }
    loadBookLogs();
  },[])

  const handleAddBookLog=async(newBook:BookLog)=>{
    try{
      const {id,...booklogWithoutID}=newBook;
      const newID=await addBookLog(booklogWithoutID);
      setBookLogs([...booklogs,{...newBook,id:newID}]);
      console.log("Libro añadido:", newBook.titulo);
    }
    catch(error){
      console.log(`Error al añadir el libro ${error}`);
      setError("Error al añadir el libro");
    }
  }

  const handleDeleteBookLog = async (id: string) => {
    // Pedimos confirmación antes de borrar (UX)
    if (!window.confirm("¿Seguro que quieres eliminar este libro?")) return;

    try {
      
      await deleteBookLog(id);
      
      setBookLogs(booklogs.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error eliminando libro:", err);
      setError("Error al eliminar el libro.");
    }
  };

  return (
    <div className="container">
      <header
        style={{
          marginBottom: "30px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          📚 BookLog{" "}
          <span style={{ fontSize: "0.6em", color: "#666" }}>
            Gestión de Biblioteca
          </span>
        </h1>
      </header>

      {/* los errores*/}
      {error && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#fee",
            border: "1px solid #e74c3c",
            borderRadius: "6px",
            color: "#c0392b",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>⚠️ {error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <main>
        {/* Formulario */}
        <section
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Nuevo Libro</h2>
          <BookLogForm onAdd={handleAddBookLog} />
        </section>

        
        <section>
          <h2 style={{ marginBottom: "20px" }}>Catálogo Actual</h2>
          {isLoading ? (
            <p style={{ textAlign: "center", color: "#999", padding: "40px" }}>
              ⏳ Cargando libros...
            </p>
          ) : (
            <BookLogList items={booklogs} onDelete={handleDeleteBookLog} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;