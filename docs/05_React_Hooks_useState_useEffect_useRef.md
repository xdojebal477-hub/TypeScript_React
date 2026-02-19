# 📘 Guía 5: React Hooks — useState, useEffect y useRef

> **Basada en tus proyectos: mi-tienda (Contador, Cronometro, Timer, Alert, Accordion, Tabs, VideoReproductor, ConsumirAPI, Focus)**
> Los hooks son funciones especiales que dan "vida" a tus componentes: estado, efectos secundarios y referencias.

---

## ¿Qué son los Hooks?

Los hooks son funciones de React que empiezan por `use` y permiten añadir funcionalidades a los componentes funcionales:
- **`useState`** → Estado local (memoria del componente)
- **`useEffect`** → Efectos secundarios (fetch, timers, suscripciones)
- **`useRef`** → Referencias al DOM o valores persistentes sin re-render

### Reglas de los Hooks:
1. **Solo** se llaman en el **nivel superior** del componente (nunca dentro de ifs, loops o funciones anidadas)
2. **Solo** se llaman dentro de **componentes React** o **custom hooks**

---

## 1. `useState` — El estado del componente

### ¿Qué es?
`useState` crea una "variable especial" que, cuando cambia, **provoca un re-renderizado** del componente.

### Sintaxis:
```tsx
const [valor, setValor] = useState(valorInicial);
//      ↑        ↑                    ↑
//   lectura  actualizar     valor de arranque
```

### ¿Por qué no una variable normal?
```tsx
// ❌ Esto NO funciona en React
let count = 0;
const increment = () => { count++; };  // La variable cambia, pero React no lo sabe

// ✅ Esto SÍ funciona
const [count, setCount] = useState(0);
const increment = () => { setCount(count + 1); };  // React re-renderiza
```
> React solo sabe que debe re-renderizar cuando llamas a la función `set___()`.

---

### Ejemplo 1: Contador simple (Contador.tsx)

```tsx
import { useState } from "react";

const Contador = () => {
  const [count, setCount] = useState(0);  // estado: empieza en 0

  return (
    <div>
      <h2>Contador: {count} veces pulsado</h2>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
};
```

### El ciclo:
```
1. React renderiza: count = 0, muestra "Contador: 0"
2. Usuario pulsa "Incrementar"
3. setCount(0 + 1) → count = 1
4. React RE-RENDERIZA: muestra "Contador: 1"
5. Y así sucesivamente...
```

---

### Ejemplo 2: Toggle visibilidad (Alert.tsx)

```tsx
const Alert = ({ message, type, showIcon = true }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);  // empieza visible

  if (!isVisible) return null;  // si no es visible, no renderiza nada

  return (
    <div className={`alert alert-${type}`}>
      <strong>{message}</strong>
      <button onClick={() => setIsVisible(false)}>✖</button>
    </div>
  );
};
```

---

### Ejemplo 3: Accordion (abrir/cerrar) — Accordion.tsx

```tsx
const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}   // toggle: true ↔ false
      >
        <span>{title}</span>
        <span className={`icon-arrow ${isOpen ? 'rotate' : ''}`}>▼</span>
      </div>
      
      {isOpen && (                          // renderizado condicional
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};
```

---

### Ejemplo 4: Tabs (pestaña activa) — Tab.tsx

```tsx
const Tabs = ({ items }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(items[0].id);

  const activeItem = items.find((item) => item.id === activeTabId);

  return (
    <div>
      <div className="tabs-header">
        {items.map((item) => (
          <button
            key={item.id}
            className={`tab-btn ${activeTabId === item.id ? 'active' : ''}`}
            onClick={() => setActiveTabId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        {activeItem?.content}
      </div>
    </div>
  );
};
```

### Conceptos clave del ejemplo:
- `items[0].id` → El estado inicial es el id de la primera pestaña
- `items.find(...)` → Busca el tab activo para mostrar su contenido
- `activeTabId === item.id ? 'active' : ''` → Clase CSS condicional
- `activeItem?.content` → **Optional chaining** (`?.`): si `activeItem` es undefined, no da error

---

### Ejemplo 5: Mostrar/Ocultar componente (App.tsx de mi-tienda)

```tsx
function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Ocultar" : "Mostrar"} Cronómetro
      </button>

      {showTimer && <Timer />}
    </>
  );
}
```
> Cuando `showTimer` pasa a `false`, React **DESTRUYE** el componente `Timer` (lo desmonta del DOM). Cuando vuelve a `true`, lo **CREA de nuevo** desde cero.

---

### Estado con arrays y objetos:

**Añadir a un array (inmutable):**
```tsx
const [items, setItems] = useState<Item[]>([]);

// ✅ Spread: crea un NUEVO array con el elemento añadido
setItems([...items, nuevoItem]);

// ❌ NUNCA hagas push directamente
items.push(nuevoItem);   // React NO detecta el cambio
setItems(items);          // Es la misma referencia, React ignora
```

**Eliminar de un array (inmutable):**
```tsx
setItems(items.filter(item => item.id !== idAEliminar));
// filter devuelve un NUEVO array → React detecta el cambio
```

**Actualizar un objeto del estado:**
```tsx
setBookLogs([...booklogs, { ...newBook, id: newID }]);
//                          ↑ copia el libro + sobreescribe id
```

> **Regla de oro**: NUNCA mutes el estado directamente. Siempre crea una **NUEVA referencia** (nuevo array, nuevo objeto).

---

## 2. `useEffect` — Efectos secundarios

### ¿Qué es?
`useEffect` ejecuta código **después** del renderizado. Se usa para cosas que no son "puro renderizado": fetch de datos, timers, suscripciones, manipulación del DOM.

### Sintaxis:
```tsx
useEffect(() => {
    // Código que se ejecuta DESPUÉS del render
    
    return () => {
        // Cleanup: se ejecuta al DESMONTAR o antes del siguiente efecto
    };
}, [dependencias]);  // ← cuándo se ejecuta
```

### Las 3 variantes según las dependencias:

**1. Sin array de dependencias → Se ejecuta en CADA render:**
```tsx
useEffect(() => {
    renderCount.current += 1;  // se ejecuta cada vez que el componente se re-renderiza
});
```

**2. Array vacío `[]` → Solo al MONTAR (una vez):**
```tsx
useEffect(() => {
    inputRef.current?.focus();  // enfoca el input solo al aparecer
}, []);
```

**3. Con dependencias `[valor]` → Cuando ese valor CAMBIA:**
```tsx
useEffect(() => {
    if (isPlaying) videRef.current?.play();
    else videRef.current?.pause();
}, [isPlaying]);  // se ejecuta cuando isPlaying cambia
```

---

### Ejemplo 1: Timer con setInterval (Timer.tsx)

```tsx
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Se ejecuta UNA VEZ al montar ([] vacío)
    const intervalID = setInterval(() => {
      setSeconds((prev) => prev + 1);  // ⚠️ functional update
    }, 1000);

    // CLEANUP: se ejecuta al DESMONTAR el componente
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return <div>{seconds} s</div>;
};
```

### ¿Por qué `prev => prev + 1` y no `seconds + 1`?
```tsx
// ❌ PROBLEMA: 'seconds' siempre es 0 por el closure
setSeconds(seconds + 1);  // siempre hace 0 + 1 = 1

// ✅ SOLUCIÓN: functional update — 'prev' siempre es el valor actual
setSeconds((prev) => prev + 1);  // 0→1→2→3→4...
```
> El `useEffect` se ejecuta una vez con `[]`. La función del `setInterval` "captura" el valor de `seconds` en 0 (closure). Con la forma funcional `prev => prev + 1`, React siempre te da el valor más reciente.

### ¿Por qué el cleanup `return () => clearInterval(...)`?
Cuando el componente se **desmonta** (desaparece del DOM), el intervalo seguiría ejecutándose en la memoria. El cleanup lo limpia para evitar **memory leaks**.

```
Componente aparece (mount)   → useEffect crea el setInterval
Componente desaparece (unmount) → cleanup ejecuta clearInterval
```

---

### Ejemplo 2: Cronómetro completo (Cronometro.tsx)

```tsx
const Cronometro = ({ pausado }: Props) => {
  const [decimas, setDecimas] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [funcionando, setFuncionando] = useState(!pausado);

  useEffect(() => {
    let intervalID: number | undefined;
    
    if (funcionando) {
      intervalID = setInterval(() => {
        if (decimas < 9) {
          setDecimas((prev) => prev + 1);
        } else if (decimas == 9 && segundos < 59) {
          setDecimas(0);
          setSegundos((prev) => prev + 1);
        } else if (decimas == 9 && segundos == 59) {
          setDecimas(0);
          setSegundos(0);
          setMinutos((prev) => prev + 1);
        }
      }, 100);
    }

    return () => clearInterval(intervalID);  // cleanup
  }, [decimas, segundos, minutos, funcionando]);
  //  ↑ se re-ejecuta cuando cualquiera de estos cambia
```

### ¿Por qué tantas dependencias?
Porque la lógica del intervalo **lee** `decimas`, `segundos` y `minutos`. Si no los pones en las dependencias, el efecto usaría valores desactualizados (closure stale).

---

### Ejemplo 3: Fetch de datos al montar (ConsumirAPI.tsx)

```tsx
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();  // ejecuta la función async
  }, []);  // [] = solo al montar
```

### ⚠️ ¿Por qué una función async dentro del useEffect?
```tsx
// ❌ useEffect NO puede ser async directamente
useEffect(async () => {  // ESTO DA ERROR
    const data = await fetch(...);
}, []);

// ✅ Define una función async DENTRO y llámala
useEffect(() => {
    async function fetchData() {
        const data = await fetch(...);
    }
    fetchData();
}, []);
```

### Patrón completo de fetch con estados de carga:
```tsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    async function loadData() {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError("Error al cargar");
        } finally {
            setIsLoading(false);
        }
    }
    loadData();
}, []);

// En el JSX:
{error && <p style={{color: 'red'}}>{error}</p>}
{isLoading ? <p>Cargando...</p> : <Lista data={data} />}
```

---

### Ejemplo 4: Controlar un video (VideoReproductor.tsx)

```tsx
const VideoReproductor = ({ src }: VideoReproductorProps) => {
  const videRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) videRef.current?.play();
    else videRef.current?.pause();
  }, [isPlaying]);  // se ejecuta cuando isPlaying cambia

  return (
    <div>
      <video ref={videRef} src={src} loop playsInline />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}
      </button>
    </div>
  );
};
```

### El flujo:
```
1. Usuario pulsa "Reproducir"
2. setIsPlaying(true) → re-render
3. useEffect detecta que [isPlaying] cambió
4. Ejecuta videRef.current.play()
5. El video se reproduce
```

---

## 3. `useRef` — Referencias sin re-render

### ¿Qué es?
`useRef` crea un contenedor persistente cuyo valor (`ref.current`) NO provoca re-render al cambiar.

### Dos usos principales:

**1. Referenciar elementos del DOM:**
```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    inputRef.current?.focus();  // enfoca el input después del montaje
}, []);

return <input ref={inputRef} type="text" />;
//              ↑ conecta el ref con el elemento DOM
```

**2. Guardar valores persistentes sin causar re-render:**
```tsx
const renderCount = useRef(0);

useEffect(() => {
    renderCount.current += 1;  // se actualiza sin re-renderizar
});

return <p>Renders: {renderCount.current}</p>;
```

### Diferencia `useState` vs `useRef`:
| | `useState` | `useRef` |
|---|---|---|
| Re-render | Sí, al hacer `setState` | No |
| Persistencia | Sí, entre renders | Sí, entre renders |
| Uso principal | Datos que afectan a la UI | DOM, contadores internos, timers |

---

## Resumen para el examen — Hooks Cheat Sheet

```tsx
// useState — estado reactivo
const [valor, setValor] = useState(inicial);
setValor(nuevoValor);          // actualización directa
setValor(prev => prev + 1);    // actualización funcional (para closures)

// useEffect — efectos secundarios
useEffect(() => {
    // efecto
    return () => { /* cleanup */ };
}, [deps]);
// []     → solo al montar
// [a, b] → cuando a o b cambien
// (nada) → cada render

// useRef — referencia persistente sin re-render
const ref = useRef<HTMLElement>(null);
ref.current  // accede al valor/elemento
```

### Patrones comunes:

| Patrón | Hook(s) | Ejemplo |
|---|---|---|
| Contador | `useState` | `Contador.tsx` |
| Toggle | `useState` | `Alert.tsx`, `Accordion.tsx` |
| Tabs | `useState` + `find` | `Tab.tsx` |
| Timer | `useState` + `useEffect` + cleanup | `Timer.tsx` |
| Fetch datos | `useState` + `useEffect` + async | `ConsumirAPI.tsx` |
| Control video | `useRef` + `useEffect` + `useState` | `VideoReproductor.tsx` |
| Auto-focus | `useRef` + `useEffect` | `Focus.tsx` |
