# 📘 Guía 7: MEGA RESUMEN — Cheat Sheet para el Examen

> **Todo en una sola página. Repaso rápido antes de entrar al examen.**

---

## ES6 — JavaScript Moderno

```javascript
// ─── const / let ───
const PI = 3.14;          // no reasignable (usar siempre por defecto)
let contador = 0;         // reasignable (solo cuando necesites cambiar)

// ─── Arrow Functions ───
const saluda = () => "Hola";                     // retorno implícito
const doble = (n) => n * 2;                      // un parámetro
const suma = (a, b) => a + b;                    // varios parámetros
const getObj = () => ({ key: "valor" });          // ⚠️ paréntesis para devolver objeto
const compleja = (x) => { const y = x * 2; return y; };  // con cuerpo

// ─── Template Literals ───
const msg = `Hola ${nombre}, tienes ${edad} años`;
const html = `<div><h2>${titulo}</h2></div>`;     // multilínea

// ─── Desestructuración ───
const { nombre, email } = usuario;                // de objeto
const [primero, segundo] = array;                 // de array
const [count, setCount] = useState(0);            // React useState

// ─── Spread (expandir) ───
const copia = { ...original, nuevaProp: valor };  // copiar y sobreescribir
const nuevoArr = [...arrViejo, nuevoItem];        // añadir a array

// ─── Rest (agrupar) ───
const sumar = (...nums) => nums.reduce((t, n) => t + n, 0);
const { id, ...resto } = objeto;                  // separar propiedades

// ─── Módulos ───
export { fn1, fn2 };                      // named export
export default MiClase;                   // default export
import { fn1, fn2 } from './archivo';     // named import (con llaves)
import MiClase from './archivo';          // default import (sin llaves)

// ─── Métodos de Arrays ───
arr.map(item => <Card data={item} />)     // transforma cada elemento
arr.filter(item => item.id !== id)        // filtra (nuevo array)
arr.find(item => item.id === id)          // busca uno
arr.reduce((acc, item) => acc + item, 0)  // acumula en un valor
```

---

## Asincronía

```javascript
// ─── Promesas ───
new Promise((resolve, reject) => {
    // resolve(valor) → éxito
    // reject(error)  → fallo
});
promise.then(result => ...).catch(error => ...);

// ─── Async / Await ───
async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// ─── Fetch (GET) ───
const response = await fetch(url);
const data = await response.json();       // para JSON
const text = await response.text();       // para texto

// ─── Fetch (POST/PATCH/DELETE) ───
await fetch(url, {
    method: "POST",        // o "PATCH" o "DELETE"
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(objeto),
});

// ─── localStorage ───
localStorage.setItem("key", "string");
localStorage.getItem("key");              // → string o null
localStorage.removeItem("key");
JSON.stringify(objeto) → guarda objetos como string
JSON.parse(string) → recupera objetos desde string
```

---

## TypeScript

```typescript
// ─── Tipos básicos ───
let nombre: string = "Ana";
let edad: number = 25;
let activo: boolean = true;

// ─── Interface (forma de un objeto) ───
interface Usuario {
  id: string;
  nombre: string;
  email?: string;         // ? = opcional
}

// ─── Type Union ───
type Estado = "activo" | "inactivo" | "pendiente";

// ─── Array tipado ───
const users: Usuario[] = [];

// ─── Función tipada ───
function saludar(nombre: string): string { return `Hola ${nombre}`; }

// ─── Función como tipo (callbacks) ───
onDelete: (id: string) => void

// ─── Genéricos ───
function caja<T>(contenido: T) { return { datos: contenido }; }
useState<BookLog[]>(mockData);

// ─── Omit ───
Omit<BookLog, "id">   // BookLog sin el campo "id"

// ─── Type casting ───
e.target.value as Equipment["tipo"]
data as Equipment[]
```

---

## React — Componentes y JSX

```tsx
// ─── Componente funcional ───
const MiComponente = () => <div>Hola</div>;

// ─── Con props tipadas ───
interface Props {
  titulo: string;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
}
const Card = ({ titulo, onDelete, children }: Props) => (
  <div>
    <h3>{titulo}</h3>
    {children}
    <button onClick={() => onDelete("123")}>Borrar</button>
  </div>
);

// ─── Renderizado condicional ───
{condicion && <Componente />}                 // muestra si true
{condicion ? <CompA /> : <CompB />}           // uno u otro
if (!visible) return null;                     // return anticipado

// ─── Listas ───
{items.map(item => <Card key={item.id} data={item} />)}

// ─── JSX ───
className="..."                // en vez de class
style={{ color: "red" }}       // objeto, camelCase
onClick={() => fn()}           // eventos en camelCase
htmlFor="id"                   // en vez de for
<> ... </>                     // Fragment (wrapper sin DOM)
```

---

## React Hooks

```tsx
// ═══ useState ═══
const [valor, setValor] = useState(inicial);
setValor(nuevo);                    // actualización directa
setValor(prev => prev + 1);        // funcional (para closures/timers)
setItems([...items, nuevo]);        // añadir a array (inmutable)
setItems(items.filter(i => i.id !== id));  // eliminar (inmutable)

// ═══ useEffect ═══
useEffect(() => { ... }, []);        // solo al montar
useEffect(() => { ... }, [dep]);     // cuando 'dep' cambia
useEffect(() => {
    const id = setInterval(...);
    return () => clearInterval(id);  // cleanup al desmontar
}, []);

// ⚠️ async dentro de useEffect:
useEffect(() => {
    async function load() { const d = await fetch(...); }
    load();
}, []);

// ═══ useRef ═══
const ref = useRef<HTMLInputElement>(null);
<input ref={ref} />
ref.current?.focus();               // accede al DOM
```

---

## React + Firebase (Firestore)

```tsx
// ─── Configuración ───
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(config);
export const db = getFirestore(app);

// ─── CRUD ───
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

// READ (cargar al montar)
useEffect(() => {
  async function load() {
    const snap = await getDocs(collection(db, "coleccion"));
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Tipo[];
    setItems(data);
  }
  load();
}, []);

// CREATE
const handleAdd = async (newItem) => {
  const { id, ...data } = newItem;
  const ref = await addDoc(collection(db, "coleccion"), data);
  setItems([...items, { ...newItem, id: ref.id }]);
};

// DELETE
const handleDelete = async (id) => {
  await deleteDoc(doc(db, "coleccion", id));
  setItems(items.filter(i => i.id !== id));
};

// ─── Formulario controlado ───
const [campo, setCampo] = useState("");
<input value={campo} onChange={(e) => setCampo(e.target.value)} />
<form onSubmit={(e) => { e.preventDefault(); /* lógica */ }}>
```

---

## Patrón de Arquitectura (el que usas en todos los proyectos)

```
App.tsx (estado + lógica)
 ├── Form.tsx (props: onAdd)           ← formulario controlado
 └── List.tsx (props: items, onDelete) ← renderiza con map
      └── Card.tsx (props: data, onDelete)  ← muestra + botón eliminar
```

```
Flujo de datos:
  PADRE → (props) → HIJO              datos bajan
  HIJO → (callback) → PADRE           eventos suben
```

---

## Errores comunes en exámenes

| Error | Corrección |
|---|---|
| `class="algo"` en JSX | `className="algo"` |
| Olvidar `key` en `map` | `<Card key={item.id} />` |
| `useEffect(async () => ...)` | Función async DENTRO del useEffect |
| Mutar estado: `items.push(x)` | `setItems([...items, x])` |
| `seconds + 1` en setInterval | `prev => prev + 1` (functional update) |
| No limpiar setInterval | `return () => clearInterval(id)` |
| Olvidar `e.preventDefault()` | El form recarga la página |
| No verificar `response.ok` | `fetch` no lanza error en 404/500 |
| `export default` + `import { }` | Sin llaves para default: `import X` |

---

**¡Mucha suerte en el examen!** Si entiendes estos patrones, puedes construir cualquier app React con Firebase. Todo tu código sigue los mismos principios repetidos una y otra vez.
