# 📘 Guía 6: React con Firebase (Firestore) — CRUD Completo

> **Basada en tus proyectos: tech-inventory, bool-log**
> Cómo conectar una app React con Firebase Firestore para persistencia real en la nube.

---

## 1. ¿Qué es Firebase Firestore?

Firebase es una plataforma de Google que ofrece (entre otras cosas) una **base de datos NoSQL** en la nube llamada **Firestore**. Tus datos se guardan como **documentos** organizados en **colecciones**.

### Estructura de Firestore:
```
Base de datos
 └── Colección: "equipos"
      ├── Documento: "abc123" → { nombre: "Dell", tipo: "portatil", estado: "asignado" }
      ├── Documento: "def456" → { nombre: "HP Monitor", tipo: "monitor", estado: "disponible" }
      └── Documento: "ghi789" → { nombre: "Logitech", tipo: "teclado", estado: "averiado" }
```

### Analogía SQL:
| SQL | Firestore |
|---|---|
| Tabla | Colección |
| Fila | Documento |
| Columna | Campo |
| ID de fila | ID del documento (automático) |

---

## 2. Configuración de Firebase

### Paso 1: Instalar el SDK
```bash
npm install firebase
```

### Paso 2: Crear el archivo de configuración (firebase.ts)

**tech-inventory/firebase.tsx:**
```tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "techinventory-b3404.firebaseapp.com",
  projectId: "techinventory-b3404",
  storageBucket: "techinventory-b3404.firebasestorage.app",
  messagingSenderId: "932030502769",
  appId: "1:932030502769:web:..."
};

// 1. Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// 2. Obtiene la referencia a Firestore y la exporta
export const db = getFirestore(app);
```

### ¿Qué hace cada cosa?
- `initializeApp(config)` → Conecta tu app con el proyecto Firebase
- `getFirestore(app)` → Obtiene la instancia de la base de datos Firestore
- `export const db` → La exportamos para usarla en toda la app

> ⚠️ Las API keys de Firebase son **públicas por diseño** (no son secretas). La seguridad se gestiona con **Firebase Security Rules** en la consola de Firebase.

---

## 3. Definir los tipos (types.ts)

**tech-inventory/types.ts:**
```typescript
export interface Equipment {
    id: string;                                    // ID de Firebase
    nombre: string;
    tipo: 'portatil' | 'monitor' | 'teclado' | 'otro';  // union type
    estado: 'disponible' | 'averiado' | 'asignado';       // union type
}
```

**bool-log/types.ts:**
```typescript
export interface BookLog {
  id: string;
  titulo: string;
  autor: string;
  estado: "disponible" | "prestado" | "retirado";
  numeroPaginas: number;
  fechaPrestamo?: string;    // opcional
  portadaUrl?: string;       // opcional
}
```

> Los tipos dan seguridad: si intentas crear un Equipment con `tipo: "impresora"`, TypeScript da error porque no está en el union type.

---

## 4. Servicio de Firebase (serviceFireBase.ts) — bool-log

El proyecto bool-log separa la lógica de Firebase en un archivo aparte. Este es el patrón más limpio:

```typescript
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { BookLog } from "./types";

const COLLECTION_NAME = "books";
```

### READ — Obtener todos los documentos:
```typescript
export async function getBooks(): Promise<BookLog[]> {
  // 1. Pide TODOS los documentos de la colección "books"
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

  // 2. Transforma los documentos de Firebase a nuestro tipo BookLog
  const booklogs: BookLog[] = [];
  querySnapshot.forEach((docSnap) => {
    booklogs.push({
      id: docSnap.id,                           // ID del documento en Firebase
      ...(docSnap.data() as Omit<BookLog, "id">),  // resto de los campos
    });
  });

  return booklogs;
}
```

### ¿Qué pasa aquí paso a paso?
1. `getDocs(collection(db, "books"))` → Consulta Firebase y trae todos los documentos
2. `querySnapshot` → Es como un "paquete" con todos los resultados
3. `docSnap.id` → Firebase genera IDs automáticos (ej: "xK7yQ2nM...")
4. `docSnap.data()` → Devuelve los campos del documento como objeto JS
5. `as Omit<BookLog, "id">` → Le decimos a TypeScript que los datos son un BookLog sin id

### CREATE — Añadir un documento:
```typescript
export async function addBookLog(booklog: Omit<BookLog, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), booklog);
    return docRef.id;  // devuelve el ID que Firebase generó
}
```

### ¿Por qué `Omit<BookLog, "id">`?
Porque **Firebase genera el ID** automáticamente. No lo envías tú. `Omit<BookLog, "id">` crea un tipo que tiene todas las propiedades de BookLog excepto `id`.

### DELETE — Eliminar un documento:
```typescript
export async function deleteBookLog(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);  // referencia al documento
    return deleteDoc(docRef);                       // lo elimina
}
```

### Funciones de Firestore que debes conocer:
| Función | Qué hace | Ejemplo |
|---|---|---|
| `collection(db, "nombre")` | Referencia a una colección | `collection(db, "books")` |
| `doc(db, "coleccion", "id")` | Referencia a un documento específico | `doc(db, "books", "abc123")` |
| `getDocs(collectionRef)` | Lee TODOS los documentos | GET |
| `addDoc(collectionRef, data)` | Crea un nuevo documento | POST |
| `deleteDoc(docRef)` | Elimina un documento | DELETE |

---

## 5. Conectar Firebase con React (App.tsx)

### tech-inventory — Todo en App.tsx (enfoque directo):

```tsx
function App() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);

  // ══════════════════════════════════════
  // CARGAR DATOS AL MONTAR (useEffect)
  // ══════════════════════════════════════
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Pide todos los documentos de "equipos"
        const querySnapshot = await getDocs(collection(db, "equipos"));
        
        // Transforma cada documento en un objeto Equipment
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Equipment[];

        setEquipment(data);  // actualiza el estado
      } catch (error) {
        console.log(`Error al cargar: ${error}`);
      } finally {
        setIsLoading(false);  // siempre quita el loading
      }
    };
    fetchData();
  }, []);  // [] = solo al montar
```

### ¿Por qué `mockData` como estado inicial?
```tsx
const [equipment, setEquipment] = useState<Equipment[]>(mockData);
```
El estado empieza con datos falsos (`mockData`) para que la UI no esté vacía mientras carga. Cuando Firebase responde, se reemplaza con datos reales.

### AÑADIR un equipo:
```tsx
  const handleAddEquipment = async (newItem: Equipment) => {
    try {
      // 1. Extraer el id (no lo enviamos a Firebase)
      const { id, ...dataToSave } = newItem;

      // 2. Guardar en Firebase → devuelve el ID real
      const docRef = await addDoc(collection(db, "equipos"), dataToSave);
      
      // 3. Crear el item con el ID de Firebase
      const savedItem = { ...newItem, id: docRef.id };

      // 4. Actualizar el estado local (añadir al array)
      setEquipment([...equipment, savedItem]);
    } catch (error) {
      console.log(`Error al guardar: ${error}`);
    }
  };
```

### El flujo paso a paso:
```
Usuario rellena formulario y pulsa "Añadir"
  → EquipmentForm llama onAdd(newItem)
    → handleAddEquipment se ejecuta
      → 1. Separa el id temporal del resto: { id, ...dataToSave }
      → 2. addDoc envía dataToSave a Firebase
      → 3. Firebase devuelve el ID real (docRef.id)
      → 4. setEquipment añade el item con el ID real
        → React re-renderiza la lista con el nuevo item
```

### ELIMINAR un equipo:
```tsx
  const handleDeleteEquipment = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar?")) return;  // confirmación UX
    
    try {
      // 1. Eliminar de Firebase
      await deleteDoc(doc(db, "equipos", id));

      // 2. Eliminar del estado local
      const newList = equipment.filter((eq) => eq.id !== id);
      setEquipment(newList);
    } catch (error) {
      console.log(`Error al eliminar: ${error}`);
    }
  };
```

### El flujo:
```
Usuario pulsa "Eliminar" en una Card
  → Card llama onDelete(data.id)
    → handleDeleteEquipment se ejecuta
      → 1. Muestra confirm() de confirmación
      → 2. deleteDoc elimina de Firebase
      → 3. filter crea nuevo array sin ese item
      → 4. setEquipment actualiza → React re-renderiza
```

---

## 6. bool-log — Enfoque con servicio separado

La diferencia con tech-inventory es que bool-log tiene la lógica de Firebase en `serviceFireBase.ts`:

```tsx
// App.tsx de bool-log
import { getBooks, addBookLog, deleteBookLog } from "./serviceFireBase";

function App() {
  const [booklogs, setBookLogs] = useState<BookLog[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos
  useEffect(() => {
    async function loadBookLogs() {
      try {
        const booklogsFirebase = await getBooks();  // ← llama al servicio
        setBookLogs(booklogsFirebase);
      } catch (error) {
        setError("Error al cargar los libros");
      } finally {
        setIsLoading(false);
      }
    }
    loadBookLogs();
  }, []);

  // Añadir
  const handleAddBookLog = async (newBook: BookLog) => {
    try {
      const { id, ...booklogWithoutID } = newBook;
      const newID = await addBookLog(booklogWithoutID);  // ← llama al servicio
      setBookLogs([...booklogs, { ...newBook, id: newID }]);
    } catch (error) {
      setError("Error al añadir el libro");
    }
  };

  // Eliminar
  const handleDeleteBookLog = async (id: string) => {
    if (!window.confirm("¿Seguro?")) return;
    try {
      await deleteBookLog(id);  // ← llama al servicio
      setBookLogs(booklogs.filter((book) => book.id !== id));
    } catch (error) {
      setError("Error al eliminar el libro.");
    }
  };
```

### ¿Por qué separar en un servicio?
- **Separación de responsabilidades**: App.tsx gestiona el estado y la UI. El servicio gestiona Firebase.
- **Reutilizabilidad**: Si cambias de Firebase a otra DB, solo cambias el servicio.
- **Testabilidad**: Más fácil de testear cada parte por separado.

---

## 7. Formularios en React (controlados)

### ¿Qué es un formulario controlado?
Un formulario donde React controla el valor de cada input mediante `useState`.

### EquipmentForm.tsx:
```tsx
export function EquipmentForm({ onAdd }: EquipmentFormProps) {
  // Un estado por cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<Equipment["tipo"]>("portatil");
  const [estado, setEstado] = useState<Equipment["estado"]>("disponible");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();           // evita recarga de página
    if (!nombre) return;          // validación básica

    const newItem: Equipment = {
      id: crypto.randomUUID(),    // ID temporal (Firebase dará el real)
      nombre,                     // shorthand: nombre: nombre
      tipo,
      estado,
    };
    
    onAdd(newItem);               // llama al callback del padre
    setNombre("");                // limpia el formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}                              // ← valor controlado por React
        onChange={(e) => setNombre(e.target.value)}  // ← actualiza el estado
      />
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as Equipment["tipo"])}
      >
        <option value="portatil">Portátil</option>
        <option value="monitor">Monitor</option>
      </select>
      <button type="submit" disabled={!nombre}>Añadir</button>
    </form>
  );
}
```

### Conceptos clave:
1. **`value={nombre}`** → El input muestra lo que dice el estado
2. **`onChange={(e) => setNombre(e.target.value)}`** → Cada tecla actualiza el estado
3. **`e.preventDefault()`** → Evita que el formulario recargue la página
4. **`disabled={!nombre}`** → Desactiva el botón si el campo está vacío
5. **`crypto.randomUUID()`** → Genera un ID temporal único (UUID)
6. **Después de enviar → limpiar**: `setNombre("")` resetea el campo

---

## 8. Manejo de errores en la UI

### bool-log muestra errores con estado:
```tsx
const [error, setError] = useState<string | null>(null);

// En el JSX:
{error && (
    <div style={{ backgroundColor: "#fee", color: "#c0392b" }}>
        <span>⚠️ {error}</span>
        <button onClick={() => setError(null)}>✕</button>
    </div>
)}
```

### El patrón try/catch:
```tsx
try {
    await deleteBookLog(id);
    setBookLogs(booklogs.filter(...));
} catch (err) {
    setError("Error al eliminar el libro.");  // ← muestra al usuario
    console.error("Error eliminando:", err);   // ← para debugging
}
```

---

## 9. Arquitectura completa — Diagrama

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│  Estado: [items], [isLoading], [error]                  │
│  Funciones: handleAdd, handleDelete                     │
│                                                         │
│  useEffect → carga datos de Firebase al montar          │
│                                                         │
│  ┌───────────────────┐  ┌────────────────────────────┐  │
│  │    Form.tsx        │  │        List.tsx            │  │
│  │    (onAdd prop)    │  │   (items, onDelete props)  │  │
│  │                    │  │                            │  │
│  │  useState x campo  │  │  items.map(item =>         │  │
│  │  handleSubmit      │  │    <Card key={id}          │  │
│  │  → crea objeto     │  │          data={item}       │  │
│  │  → llama onAdd()   │  │          onDelete={...} /> │  │
│  └───────────────────┘  │  )                          │  │
│                          └────────────────────────────┘  │
│                                                         │
│  serviceFireBase.ts ←→ firebase.ts ←→ ☁️ FIRESTORE     │
└─────────────────────────────────────────────────────────┘
```

---

## Resumen para el Examen

```tsx
// 1. Configurar Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 2. Operaciones CRUD
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

// READ
const snap = await getDocs(collection(db, "coleccion"));
const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

// CREATE
const ref = await addDoc(collection(db, "coleccion"), dataWithoutId);
const newId = ref.id;

// DELETE
await deleteDoc(doc(db, "coleccion", id));

// 3. Patrón React
useEffect(() => { fetchData(); }, []);           // Cargar al montar
setItems([...items, newItem]);                   // Añadir (inmutable)
setItems(items.filter(i => i.id !== id));        // Eliminar (inmutable)

// 4. Formulario controlado
const [campo, setCampo] = useState("");
<input value={campo} onChange={(e) => setCampo(e.target.value)} />
```
