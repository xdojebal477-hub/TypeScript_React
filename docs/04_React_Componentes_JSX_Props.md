# 📘 Guía 4: React — Componentes, JSX, Props y Estructura

> **Basada en tus proyectos: ejemplo-clase, mi-tienda**
> Los fundamentos de React: cómo crear componentes, pasar datos con props, y renderizar condicionalmente.

---

## 1. ¿Qué es React?

React es una **librería de JavaScript** para construir interfaces de usuario (UI) mediante **componentes reutilizables**. Cada componente es una función que devuelve JSX (HTML dentro de JavaScript).

### La idea central:
```
UI = f(estado)
```
> La interfaz es una **función del estado**. Cuando el estado cambia, React re-renderiza automáticamente solo lo que ha cambiado.

---

## 2. La estructura de un proyecto React + Vite

Todos tus proyectos siguen esta estructura:

```
mi-proyecto/
├── index.html          ← Página HTML única (SPA)
├── package.json        ← Dependencias y scripts
├── tsconfig.json       ← Configuración TypeScript
├── vite.config.ts      ← Configuración de Vite (bundler)
└── src/
    ├── main.tsx        ← PUNTO DE ENTRADA (monta React en el DOM)
    ├── App.tsx         ← Componente raíz
    ├── index.css       ← Estilos globales
    └── components/     ← Tus componentes reutilizables
```

### `main.tsx` — El punto de entrada:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### ¿Qué hace cada línea?
1. `createRoot(document.getElementById('root')!)` → Selecciona el `<div id="root">` del HTML
2. `.render(<StrictMode><App /></StrictMode>)` → Renderiza el componente `App` dentro de ese div
3. `StrictMode` → Modo desarrollo que detecta errores (doble renderizado intencional)
4. El `!` después de `getElementById` es un **non-null assertion** de TypeScript: "confía en que este elemento existe"

### `index.html` — La única página (SPA):
```html
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
```
> En una **SPA (Single Page Application)**, solo hay UNA página HTML. React maneja todo el contenido dinámico dentro del `<div id="root">`.

---

## 3. Componentes — La unidad básica de React

### ¿Qué es un componente?
Una **función** que devuelve JSX (que parece HTML). Cada componente maneja su propia lógica y vista.

### Tu primer componente (Micomponente.tsx):
```tsx
import "./Micomponente.css";

const Micomponente = () => (
  <span className="micomponente">HOLA MUNDO DESDE REACT</span>
);

export default Micomponente;
```

### Anatomía:
1. **Importaciones** → CSS, otros componentes, hooks
2. **La función** → Arrow function que retorna JSX
3. **Export** → Para que otros archivos puedan importar el componente

### Reglas de los componentes:
- El nombre **SIEMPRE empieza con MAYÚSCULA** (`Micomponente`, no `micomponente`)
- Debe devolver **UN solo elemento raíz** (o usar Fragments `<>...</>`)
- Se usa `className` en vez de `class` (porque `class` es palabra reservada en JS)

### Fragments (`<>...</>`):
```tsx
// ❌ Error: devuelve dos elementos raíz
return (
    <h1>Título</h1>
    <p>Párrafo</p>
);

// ✅ Con Fragment: envuelve sin añadir un div extra al DOM
return (
    <>
        <h1>Título</h1>
        <p>Párrafo</p>
    </>
);
```

### ¿Cómo se usa un componente? (App.tsx de ejemplo-clase):
```tsx
import Micomponente from "./components/Micomponente";
import Saludo from "./components/Saludo";

function App() {
  return (
    <>
      <Micomponente />              {/* Sin props */}
      <h1>Hola Mundo</h1>
      <Micomponente />              {/* Se puede reutilizar */}
      <Saludo nombre="Juan" apellido="Pérez" edead={25} />  {/* Con props */}
    </>
  );
}
```

---

## 4. Props — Pasar datos de padre a hijo

### ¿Qué son?
Las **props** (properties) son los datos que un componente padre pasa a un componente hijo. Son **de solo lectura** — el hijo NO puede modificarlas.

### Flujo de datos unidireccional:
```
App (padre)
 │
 ├── le pasa props →  <Saludo nombre="Juan" />
 │
 └── Saludo (hijo) → usa {nombre} para mostrar "Juan"
```

### Componente Saludo — Recibir props con TypeScript:
```tsx
// 1. Definir la interface de las props
interface SaludoProps {
  nombre?: string;     // ? = opcional
  apellido?: string;
  edead?: number;
}

// 2. Desestructurar las props en el parámetro
const Saludo = ({ nombre, apellido, edead }: SaludoProps) => {
  return (
    <>
      <h2>Hola {nombre} {apellido}, tienes {edead} años</h2>
    </>
  );
};
```

### Tipos de props que has usado:

**Strings y números — ProductCard.tsx:**
```tsx
type ProductCardProps = {
  title: string;     // string
  price: number;     // número
  image: string;     // string (URL)
  isNew?: boolean;   // boolean opcional
  inStock: boolean;  // boolean obligatorio
};
```

**Objetos complejos — UserProfile.tsx:**
```tsx
type UserProfileProps = {
  userData: {
    username: string;
    email: string;
    avatar: string;
    role: 'admin' | 'user';   // union type
  };
};
```

**Funciones (callbacks) — EquipmentCard.tsx:**
```tsx
interface EquipmentCardProps {
  data: Equipment;
  onDelete: (id: string) => void;  // función que recibe un string
}
```

**Children (contenido hijo) — Accordion.tsx:**
```tsx
type AccordionProps = {
  title: string;
  children: React.ReactNode;  // cualquier contenido JSX
};

// Uso:
<Accordion title="¿Qué es el estado?">
  <p>El estado es la memoria interna de un componente React.</p>
</Accordion>
```
> `children` es una prop especial: es TODO lo que pones entre las etiquetas de apertura y cierre del componente.

### Valores por defecto en props:
```tsx
const Alert = ({ message, type, showIcon = true }: AlertProps) => { ... };
//                                         ↑ valor por defecto si no se pasa
```

---

## 5. JSX — Expresiones en el markup

### ¿Qué es JSX?
JSX (JavaScript XML) es una extensión de sintaxis que permite escribir HTML dentro de JavaScript. Se compila a llamadas `React.createElement()`.

### Reglas de JSX:

**1. Usar `{}` para expresiones JavaScript:**
```tsx
<h2>Precio: {price.toFixed(2)} €</h2>
<p>Renders: {renderCount.current}</p>
<button onClick={() => setCount(count + 1)}>Incrementar</button>
```

**2. `className` en vez de `class`:**
```tsx
<div className="card">...</div>       // ✅
<div class="card">...</div>           // ❌
```

**3. `style` como OBJETO (no string):**
```tsx
// ❌ HTML normal
<div style="color: red; font-size: 16px">

// ✅ JSX — objeto con camelCase
<div style={{ color: "red", fontSize: "16px" }}>
```

**4. Atributos HTML en camelCase:**
```tsx
<label htmlFor="input">...</label>     // htmlFor en vez de 'for'
<input onChange={...} />                // onChange en vez de 'onchange'
<button onClick={...} />               // onClick en vez de 'onclick'
```

---

## 6. Renderizado Condicional

### Patrón 1: `&&` (mostrar u ocultar)
```tsx
// Si isNew es true, muestra el badge. Si es false, no muestra nada.
{isNew && <span className="badge-new">¡NUEVO!</span>}

// Si showTimer es true, renderiza el componente Timer
{showTimer && <Timer />}

// Si role es admin, muestra la etiqueta
{role === 'admin' && <span className="badge-admin">Admin</span>}
```

### Patrón 2: Ternario `? :` (una cosa u otra)
```tsx
// Muestra un texto u otro según el estado
<button disabled={!inStock}>
    {inStock ? 'Añadir al carrito' : 'Agotado'}
</button>

// Muestra loading o el contenido
{isLoading ? (
    <p>⏳ Cargando...</p>
) : (
    <BookLogList items={booklogs} />
)}
```

### Patrón 3: Return anticipado
```tsx
const Alert = ({ message, type }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);
    
    if (!isVisible) return null;  // ← Si no es visible, no renderiza NADA
    
    return <div className={`alert alert-${type}`}>...</div>;
};
```

### Patrón 4: Clases CSS dinámicas
```tsx
const cardClassName = `card ${!inStock ? 'out-of-stock' : ''}`;
// Si no hay stock: "card out-of-stock"
// Si hay stock: "card "

const cssClass = `accordion-header ${isOpen ? 'active' : ''}`;
```

---

## 7. Renderizado de Listas con `map()`

### El patrón más importante de React:
```tsx
{items.map((item) => (
    <ComponenteHijo key={item.id} data={item} />
))}
```

### Ejemplo real — EquipmentList.tsx:
```tsx
export function EquipmentList({ items, onDelete }: EquipmentListProps) {
  if (items.length === 0) {
    return <p>No hay equipos en el Inventario</p>;
  }

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {items.map((item) => (
        <EquipmentCard key={item.id} data={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
```

### ⚠️ La prop `key` es OBLIGATORIA:
```tsx
// ❌ Sin key — React no puede optimizar los re-renders
{items.map((item) => <Card data={item} />)}

// ✅ Con key — React sabe qué elemento cambió
{items.map((item) => <Card key={item.id} data={item} />)}
```

**¿Por qué `key`?** React usa la `key` para identificar cada elemento de la lista. Sin ella:
- React re-renderiza TODA la lista cuando cambia un solo elemento
- Puede causar bugs visuales y de estado

**Reglas para `key`:**
- Debe ser **única** entre hermanos
- Debe ser **estable** (no usar `Math.random()`)
- Lo ideal es usar el **id** del dato

---

## 8. Patrón Componente Lista + Componente Tarjeta

Todos tus proyectos siguen el mismo patrón de composición:

```
App
 ├── Form (formulario para crear)
 └── List (muestra la lista)
      └── Card (muestra un elemento)
           └── Botón eliminar
```

### El flujo completo:

```tsx
// 1. App.tsx — tiene el estado y las funciones
function App() {
    const [items, setItems] = useState<Item[]>([]);
    
    const handleAdd = (newItem: Item) => {
        setItems([...items, newItem]);     // añade al array
    };
    
    const handleDelete = (id: string) => {
        setItems(items.filter(i => i.id !== id));  // filtra el eliminado
    };
    
    return (
        <>
            <Form onAdd={handleAdd} />
            <List items={items} onDelete={handleDelete} />
        </>
    );
}

// 2. List.tsx — recibe el array y renderiza Cards
function List({ items, onDelete }) {
    return items.map(item => (
        <Card key={item.id} data={item} onDelete={onDelete} />
    ));
}

// 3. Card.tsx — muestra un elemento y tiene el botón eliminar
function Card({ data, onDelete }) {
    return (
        <div>
            <h3>{data.nombre}</h3>
            <button onClick={() => onDelete(data.id)}>Eliminar</button>
        </div>
    );
}
```

### ¿Por qué `onDelete` baja desde App?
Porque el **estado vive en App**. Solo App puede modificar `items`. 
Card dispara `onDelete(id)` → sube al `handleDelete` de App → App actualiza el estado → React re-renderiza.

> Este patrón se llama **"lifting state up"** (elevar el estado) + **callbacks como props**.

---

## Resumen para el Examen

| Concepto | Clave |
|---|---|
| Componente | Función que devuelve JSX, nombre con mayúscula |
| Props | Datos padre → hijo, solo lectura |
| `children` | Contenido entre etiquetas del componente |
| Fragment `<>` | Wrapper sin nodo DOM extra |
| `className` | En vez de `class` |
| `style={{}}` | Objeto JS con camelCase |
| `{expresion}` | Código JS dentro de JSX |
| `&&` | Renderizado condicional (mostrar/ocultar) |
| `? :` | Ternario (una opción u otra) |
| `map()` + `key` | Renderizar listas |
| `export default` | Un componente por archivo |
