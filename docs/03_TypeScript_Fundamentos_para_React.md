# 📘 Guía 3: Fundamentos de TypeScript para React

> **Basada en los ejercicios del boletinTS (ej01–ej05)**
> TypeScript añade tipos estáticos a JavaScript. Esto previene errores ANTES de ejecutar el código.

---

## ¿Por qué TypeScript?

JavaScript es **dinámico**: una variable puede ser cualquier cosa. TypeScript es **estático**: le dices al compilador qué tipo tiene cada variable, y él te avisa si cometes un error.

```javascript
// JavaScript — el error se descubre en EJECUCIÓN (tarde)
let nombre = "Juan";
nombre = 42; // No hay error... pero es un bug silencioso

// TypeScript — el error se descubre al ESCRIBIR el código (temprano)
let nombre: string = "Juan";
nombre = 42; // ❌ Error: Type 'number' not assignable to type 'string'
```

> TypeScript = JavaScript + Sistema de Tipos. Todo JS válido es TS válido.

---

## 1. `interface` — Definir la forma de un objeto

### ¿Qué es?
Un contrato que describe qué propiedades y tipos debe tener un objeto.

### EJ01 — Interface básica:
```typescript
interface Docente {
  nombre: String;
  modulo: String;
}

function mostrarDocente(docente: Docente): void {
  console.log(
    `El docente ${docente.nombre} imparte el módulo de ${docente.modulo}`
  );
}

const docente1: Docente = { nombre: "David", modulo: "Cliente" };
mostrarDocente(docente1);
```

### Desglose:
- `interface Docente { ... }` → Define que un `Docente` tiene `nombre` y `modulo`
- `docente: Docente` → El parámetro debe cumplir la interface
- `: void` → La función no devuelve nada
- Si intentas pasar `{ nombre: "David" }` sin `modulo`, TypeScript da error ❌

### Propiedades opcionales (`?`):
```typescript
interface BookLog {
  id: string;
  titulo: string;
  autor: string;
  estado: "disponible" | "prestado" | "retirado";
  numeroPaginas: number;
  fechaPrestamo?: string;   // ← El ? significa que es OPCIONAL
  portadaUrl?: string;      // ← También opcional
}
```
> Con `?` puedes crear un `BookLog` sin `fechaPrestamo` y no habrá error.

---

## 2. `type` — Union Types (Tipos Unión)

### ¿Qué es?
Un tipo que puede ser **una de varias opciones**. Ideal para estados finitos.

### EJ02 — Type literal union:
```typescript
type EstadoCarga = "iddle" | "loading" | "success" | "error";

interface RespuestaAPI {
  estado: EstadoCarga;           // solo puede ser uno de los 4 valores
  data: Usuario | null;          // puede ser un Usuario o null
}
```

### ¿Por qué es poderoso?
```typescript
function procesarRespuesta(respuesta: RespuestaAPI): void {
  switch (respuesta.estado) {
    case "iddle":
      console.log("La solicitud no ha comenzado aún.");
      break;
    case "loading":
      console.log("La solicitud está en curso...");
      break;
    case "success":
      if (respuesta.data) {  // TypeScript sabe que data podría ser null
        console.log(`Usuario: ${respuesta.data.nombre}`);
      }
      break;
    case "error":
      console.log("Hubo un error.");
      break;
  }
}
```
> Si escribes `case "loadingg":` (con typo), TypeScript te avisa inmediatamente ❌

### ¿Dónde lo usas en tus proyectos React?

**tech-inventory/types.ts:**
```typescript
export interface Equipment {
    id: string;
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
  estado: "disponible" | "prestado" | "retirado";  // union type
  numeroPaginas: number;
}
```

---

## 3. Interfaces como Props de componentes React

### ¿Qué es?
En React + TypeScript, defines una interface para los props que recibe un componente. Así TypeScript verifica que le pases todo lo necesario.

### EJ03 — Interface para simular props:
```typescript
interface BotonProps {
  label: string;
  onClick: (id: number) => void;  // función que recibe un number
}

function clickBoton({ label, onClick }: BotonProps) {
  console.log(`Botón ${label} ha sido clickeado.`);
  onClick(67);
}
```

### En tu proyecto React real (Saludo.tsx):
```tsx
interface SaludoProps {
  nombre?: string;     // opcional
  apellido?: string;   // opcional
  edead?: number;      // opcional
}

const Saludo = ({ nombre, apellido, edead }: SaludoProps) => {
  return <h2>Hola {nombre} {apellido}, tienes {edead} años</h2>;
};
```

### Otros ejemplos en tus componentes:
```tsx
// Alert (mi-tienda)
type AlertProps = {
  message: string;
  type: "info" | "warning" | "error";
  showIcon?: boolean;                    // boolean opcional
};

// ProductCard (mi-tienda)
type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
};

// EquipmentCard (tech-inventory)
export interface EquipmentCardProps {
  data: Equipment;                       // ← otro interface como tipo
  onDelete: (id: string) => void;        // ← función como prop
}
```

### `type` vs `interface` para props:
Ambos funcionan. La convención es:
- `interface` para describir la forma de objetos
- `type` para uniones, alias, y tipos más complejos

En la práctica, para props puedes usar cualquiera.

---

## 4. Arrays tipados y métodos funcionales

### EJ04 — Array de interfaces:
```typescript
interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

// Array tipado: solo puede contener objetos Tarea
const tareas: Tarea[] = [
  { id: "1", texto: "Comprar leche", completada: false },
  { id: "2", texto: "Estudiar TypeScript", completada: true },
];
```

### Usar `find` con tipos:
```typescript
function buscarTarea({ id }: Tarea) {
  const tareaEncontrada = tareas.find((tarea) => tarea.id === id);
  // tareaEncontrada es de tipo Tarea | undefined
  
  if (tareaEncontrada) {
    // Dentro de este if, TypeScript SABE que no es undefined
    console.log(tareaEncontrada.texto);  // ✅ seguro
  }
}
```

### State tipado en React:
```tsx
// El tipo va entre <> (genérico de useState)
const [booklogs, setBookLogs] = useState<BookLog[]>(mockData);
const [isLoading, setIsLoading] = useState(true);        // infiere boolean
const [error, setError] = useState<string | null>(null);  // string o null
```

---

## 5. Genéricos (`<T>`) — Funciones que trabajan con cualquier tipo

### ¿Qué es?
Un genérico es un "placeholder" de tipo que se resuelve cuando la función se usa. Es como una variable, pero para tipos.

### EJ05 — Función genérica:
```typescript
const cajaSorpresa = <T>(contenido: T) => ({ datos: contenido, secreto: true });

const cajaNumero = cajaSorpresa(42);       // T = number
const cajaTexto = cajaSorpresa("Hola");    // T = string
```

### ¿Qué pasa internamente?
```typescript
// Cuando llamas cajaSorpresa(42):
// TypeScript infiere T = number
// La función devuelve { datos: number, secreto: boolean }

cajaNumero.datos.toUpperCase();  // ❌ Error: 'number' no tiene 'toUpperCase'
cajaTexto.datos.toUpperCase();   // ✅ "HOLA" — TypeScript sabe que es string
```

### ¿Dónde los ves en React?
```tsx
useState<BookLog[]>(mockData);      // useState es genérica: <T>(initial: T) => [T, setter]
useRef<HTMLVideoElement>(null);     // useRef<T>: referencia a un elemento HTML
useRef<HTMLInputElement>(null);
```

---

## 6. Tipos útiles de TypeScript

### `Omit<Type, Keys>` — Quitar propiedades de un tipo:
```typescript
// En serviceFireBase.ts:
export async function addBookLog(booklog: Omit<BookLog, "id">): Promise<string> {
    // booklog tiene TODAS las propiedades de BookLog EXCEPTO "id"
    const docRef = await addDoc(collection(db, COLLECTION_NAME), booklog);
    return docRef.id;
}
```
> Útil porque Firebase genera el ID automáticamente, así que no lo envías tú.

### Type casting con `as`:
```typescript
// En tech-inventory:
const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
})) as Equipment[];  // ← le decimos a TS que confíe en que es Equipment[]
```

```tsx
// En formularios:
setEstado(e.target.value as BookLog["estado"]);
// e.target.value es string, lo casteamos al union type "disponible"|"prestado"|...
```

### `React.FormEvent` — Tipos de eventos:
```tsx
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...
};

// Otros tipos de eventos comunes:
// React.ChangeEvent<HTMLInputElement>
// React.MouseEvent<HTMLButtonElement>
// React.SubmitEvent
```

---

## 7. `interface` vs `type` — Resumen

| Característica | `interface` | `type` |
|---|---|---|
| Describir objetos | ✅ Sí | ✅ Sí |
| Union types | ❌ No | ✅ `"a" \| "b"` |
| Extensión | `extends` | `&` (intersección) |
| Reasignación | Se puede "merging" | No se puede redeclarar |
| Convención React | Para props complejas | Para unions y alias |

---

## Resumen para el Examen — Cheat Sheet TypeScript

```typescript
// 1. Tipos básicos
let nombre: string = "Ana";
let edad: number = 25;
let activo: boolean = true;

// 2. Interface (forma de un objeto)
interface Usuario {
  id: string;
  nombre: string;
  email?: string;  // opcional
}

// 3. Type Union (uno de varios valores)
type Estado = "activo" | "inactivo" | "pendiente";

// 4. Array tipado
const usuarios: Usuario[] = [...];

// 5. Función tipada
function saludar(nombre: string): string {
    return `Hola ${nombre}`;
}

// 6. Función como prop
interface Props {
    onDelete: (id: string) => void;
    onClick: () => void;
}

// 7. Genéricos
function identity<T>(arg: T): T { return arg; }
useState<number>(0);

// 8. Omit (quitar propiedades)
Omit<BookLog, "id">  // BookLog sin la propiedad id

// 9. Type casting
value as Equipment["tipo"]
```
