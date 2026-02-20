import { useEffect, useState } from "react";
import type { BookLog } from "./types";
import BookLogList from "./components/BookLogList";
import { BookLogForm } from "./components/BookLogForm";
import { getBooks, addBookLog, deleteBookLog } from "./serviceFireBase";
import {
  BookOpenIcon,
  PlusCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/outline";

function App() {
  // Estado reactivo: array vacío al inicio, Firebase lo llena
  const [booklogs, setBookLogs] = useState<BookLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Mensaje de éxito temporal (feedback positivo al usuario)
  const [success, setSuccess] = useState<string | null>(null);

  // Carga inicial desde Firebase (solo al montar el componente)
  useEffect(() => {
    async function loadBookLogs() {
      try {
        setIsLoading(true); // Indicamos que estamos cargando
        const booklogsFirebase = await getBooks();
        setBookLogs(booklogsFirebase);
      } catch (error) {
        console.error("Error al cargar los libros:", error);
        setError("Error al cargar los libros. Revisa tu conexión.");
      } finally {
        setIsLoading(false); // Terminó la carga (con o sin error)
      }
    }
    loadBookLogs();
  }, []);

  // Helper para mostrar mensaje de éxito que desaparece solo
  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddBookLog = async (newBook: BookLog) => {
    try {
      const { id, ...booklogWithoutID } = newBook;
      const newID = await addBookLog(booklogWithoutID);
      setBookLogs([...booklogs, { ...newBook, id: newID }]);
      showSuccess(`"${newBook.titulo}" añadido correctamente`);
    } catch (error) {
      console.error("Error al añadir el libro:", error);
      setError("Error al añadir el libro. Inténtalo de nuevo.");
    }
  };

  const handleDeleteBookLog = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres eliminar este libro?")) return;

    try {
      await deleteBookLog(id);
      const deleted = booklogs.find((b) => b.id === id);
      setBookLogs(booklogs.filter((book) => book.id !== id));
      showSuccess(`"${deleted?.titulo}" eliminado correctamente`);
    } catch (err) {
      console.error("Error eliminando libro:", err);
      setError("Error al eliminar el libro.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-violet-950">
      {/* Header / Navbar */}
      <header className="glass sticky top-0 z-10 border-b border-violet-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-400 neon-text flex items-center gap-2">
            <BookOpenIcon className="w-8 h-8" />
            BookLog
          </h1>
          <span className="hidden sm:inline text-sm text-slate-500 font-medium">
            Gestión de Biblioteca
          </span>
          <span className="text-xs text-violet-300 bg-violet-500/15 px-2.5 py-1 rounded-full border border-violet-500/20">
            {booklogs.length} libro{booklogs.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Mensaje de error */}
        {error && (
          <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg animate-fade-in">
            <span className="text-sm font-medium flex items-center gap-1.5">
              <ExclamationTriangleIcon className="w-5 h-5" />
              {error}
            </span>
            <button
              onClick={() => setError(null)}
              className="text-red-400/60 hover:text-red-400 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm font-medium animate-fade-in flex items-center gap-1.5">
            <CheckCircleIcon className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Sección del Formulario */}
        <section className="glass rounded-xl neon-border p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500/15 text-blue-400 rounded-lg flex items-center justify-center border border-blue-500/20">
              <PlusCircleIcon className="w-5 h-5" />
            </span>
            Nuevo Libro
          </h2>
          <BookLogForm onAdd={handleAddBookLog} />
        </section>

        {/* Sección de la Lista */}
        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-violet-500/15 text-violet-400 rounded-lg flex items-center justify-center border border-violet-500/20">
              <BookmarkSquareIcon className="w-5 h-5" />
            </span>
            Catálogo Actual
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              {/* Spinner neón */}
              <div className="w-10 h-10 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin mb-4 neon-glow-violet"></div>
              <p className="text-sm font-medium">Cargando libros...</p>
            </div>
          ) : (
            <BookLogList items={booklogs} onDelete={handleDeleteBookLog} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-600 border-t border-slate-800 mt-8">
        BookLog © {new Date().getFullYear()} — DOB
      </footer>
    </div>
  );
}

export default App;
