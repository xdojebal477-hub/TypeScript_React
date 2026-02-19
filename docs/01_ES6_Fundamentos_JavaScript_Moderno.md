# 📘 Guía 1: Fundamentos de ES6+ (JavaScript Moderno)

> **Basada en los ejercicios del Boletín 1 (TEMA4, EJ01–EJ10)**
> Todo lo que necesitas saber sobre las características modernas de JavaScript que usamos diariamente en React.

---

## 1. `const` vs `let` — Declaración de variables

### ¿Qué es?
ES6 introdujo `const` y `let` para reemplazar `var`. Son la forma moderna de declarar variables.

### ¿Por qué importa?
- **`const`**: La variable **no puede ser reasignada**. Úsala siempre por defecto.
- **`let`**: La variable **puede ser reasignada**. Úsala solo cuando necesites cambiar el valor.
- **`var`**: NUNCA la uses. Tiene problemas de scope (ámbito) que causan bugs difíciles de encontrar.

### ¿Cómo lo usas en tus ejercicios?

**Ejercicio 3 — Objeto con `const`:**
```javascript
const coche = {
    marca: 'Toyota',
    modelo: 'Supra',
    año: new Date().getFullYear()
};
```

**¿Por qué `const` si es un objeto?** Porque `const` impide **reasignar** la variable, pero **NO impide modificar las propiedades** del objeto. Esto es válido:
```javascript
coche.marca = 'Honda'; // ✅ Esto SÍ funciona
coche = {};            // ❌ Error: Assignment to constant variable
```

**Ejercicio 5 — `let` para un valor que podría cambiar:**
```javascript
const mostrarUsuario = (user) => {
    const { nombre, email } = user;
    let rol = "invitado";  // 'let' porque el rol podría cambiar
    return `Nombre: ${nombre}, Email: ${email}, Rol: ${rol}`;
};
```

### Regla de oro para el examen:
> Siempre usa `const`. Solo usa `let` cuando **necesites reasignar** la variable. Nunca `var`.

---

## 2. Funciones Flecha (Arrow Functions)

### ¿Qué es?
Una sintaxis más corta y limpia para escribir funciones.

### ¿Por qué importa?
1. **Sintaxis más limpia** (menos código)
2. **No tiene su propio `this`** (hereda el del contexto padre — crucial en React)
3. Permite **retorno implícito** (sin escribir `return`)

### Las 3 formas de escribirlas:

**Forma 1 — Sin parámetros (EJ01):**
```javascript
const saluda = () => `Hola!`;
// Equivale a: function saluda() { return `Hola!`; }
```

**Forma 2 — Con parámetros (EJ04):**
```javascript
const tarjetaUsuario = (usuario) => `
<div class="card">
    <h2>${usuario.nombre}</h2>
</div>
`;
```

**Forma 3 — Retorno implícito de OBJETO (EJ02):**
```javascript
const ToogleButton = (texto) => ({
    tagName: 'button',
    textContent: texto
});
```
> ⚠️ **IMPORTANTE**: Para devolver un objeto directamente, lo envuelves en paréntesis `({...})`. Sin los paréntesis, JS confunde las llaves `{}` con un bloque de código.

**Forma 4 — Con cuerpo de función (varias líneas):**
```javascript
const mostrarUsuario = (user) => {
    const { nombre, email } = user;
    let rol = "invitado";
    return `Nombre: ${nombre}, Email: ${email}, Rol: ${rol}`;
};
```
> Cuando usas `{}`, necesitas escribir `return` explícitamente.

### Regla para el examen:
| Situación | Syntax |
|---|---|
| Una sola expresión | `() => expresion` (retorno implícito) |
| Devolver un objeto | `() => ({ key: value })` (paréntesis!) |
| Varias líneas | `() => { ... return ...; }` |

---

## 3. Template Literals (Plantillas de cadena)

### ¿Qué es?
Cadenas de texto delimitadas por **backticks** (`` ` ``) que permiten incrustar expresiones JavaScript con `${...}`.

### ¿Por qué importa?
1. **Interpolación**: incrustas variables directamente en el string
2. **Multilínea**: puedes hacer saltos de línea sin `\n`
3. **Expresiones**: puedes poner cualquier expresión JS dentro de `${}`

### ¿Cómo lo usas? (EJ03 y EJ04)

**EJ03 — Interpolación básica:**
```javascript
console.log(`El coche ${coche.marca} ${coche.modelo} es del año ${coche.año}`);
// Resultado: "El coche Toyota Supra es del año 2026"
```

**EJ04 — Template multilínea con HTML:**
```javascript
const tarjetaUsuario = (usuario) => `
<div class="card">
    <h2>${usuario.nombre}</h2>
    <img src="${usuario.imagen}" alt="Imagen de ${usuario.nombre}">
</div>
`;
```
> Esto genera un string HTML perfectamente formateado con datos dinámicos. Muy usado en vanilla JS para generar DOM dinámico.

### Comparación:
```javascript
// ❌ Antiguo (concatenación fea)
"Hola, " + nombre + ". Tienes " + edad + " años."

// ✅ Moderno (template literal limpio)
`Hola, ${nombre}. Tienes ${edad} años.`
```

---

## 4. Desestructuración de Objetos y Arrays

### ¿Qué es?
Extraer valores de objetos o arrays directamente en variables individuales.

### ¿Por qué importa?
Es la base de cómo React recibe los **props** en los componentes. Lo usas constantemente.

### Desestructuración de Objetos (EJ05):

```javascript
const user = { nombre: "Pedro", email: "pedro@email.com" };

// ❌ Sin desestructurar
const nombre = user.nombre;
const email = user.email;

// ✅ Con desestructuración
const { nombre, email } = user;
```

**En parámetros de función (muy importante en React):**
```javascript
// Desestructurar directamente en los parámetros
const mostrarUsuario = ({ nombre, email }) => {
    return `Nombre: ${nombre}, Email: ${email}`;
};
```

### ¿Dónde lo ves en tus proyectos React?

**Componente Saludo (ejemplo-clase):**
```tsx
// Las props se desestructuran directamente en el parámetro
const Saludo = ({ nombre, apellido, edead }: SaludoProps) => {
    return <h2>Hola {nombre} {apellido}, tienes {edead} años</h2>;
};
```

**Componente UserProfile (mi-tienda):**
```tsx
const UserProfile = ({ userData }: UserProfileProps) => {
    // Desestructuración dentro del cuerpo
    const { username, email, avatar, role } = userData;
    return <div>...</div>;
};
```

### Desestructuración de Arrays:
```javascript
// React useState devuelve un array que desestructuramos:
const [count, setCount] = useState(0);
//       ↑          ↑
//    valor     función para actualizarlo
```

---

## 5. Operador Spread (`...`) y Rest (`...`)

### ¿Qué es?
El mismo símbolo `...` tiene dos usos diferentes según el contexto.

### SPREAD — "Expandir" (EJ06)

**Spread expande un objeto/array en otro:**
```javascript
const estado = { loading: true, error: null, data: [45, 53, 23] };

// Clonamos y sobreescribimos propiedades
const nuevoEstado = {
    ...estado,        // copia todas las propiedades de 'estado'
    loading: false    // sobreescribe solo 'loading'
};
// Resultado: { loading: false, error: null, data: [45, 53, 23] }
```

> ⚠️ **Clave**: El spread crea una **COPIA SUPERFICIAL** (shallow copy), no modifica el original. Esto es fundamental en React porque el estado debe ser **inmutable**.

**¿Dónde lo usas en React?**
```tsx
// En bool-log, al añadir un libro:
setBookLogs([...booklogs, { ...newBook, id: newID }]);
//           ↑                ↑
//     copia la lista    copia el libro con nuevo id
```

### REST — "Agrupar el resto" (EJ07)

**Rest recoge los argumentos restantes en un array:**
```javascript
const sumar = (...numeros) => numeros.reduce((total, num) => total + num, 0);

console.log(sumar(1, 2, 3, 4, 5)); // 15
console.log(sumar(10, 20, 30));     // 60
```

**También se usa para "quitar" propiedades de un objeto:**
```tsx
// En tech-inventory, al guardar en Firebase quitamos el 'id':
const { id, ...dataToSave } = newItem;
// 'id' queda en una variable aparte
// 'dataToSave' tiene TODAS las propiedades EXCEPTO 'id'
```

### Resumen visual:
| Contexto | Nombre | Qué hace |
|---|---|---|
| `{ ...obj }` | Spread | Expandir/copiar propiedades |
| `[...arr]` | Spread | Expandir/copiar elementos |
| `(...args) =>` | Rest | Agrupar argumentos en array |
| `const { x, ...resto }` | Rest | Separar propiedades |

---

## 6. Módulos en JavaScript: `import` y `export`

### ¿Qué es?
El sistema para organizar código en archivos separados y reutilizables.

### ¿Por qué importa?
React está 100% basado en módulos. Cada componente es un módulo que se exporta e importa.

### Export con nombre (Named Export) — EJ08:

**funciones.js:**
```javascript
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => {
    if (b === 0) throw new Error("No se puede dividir por cero");
    return a / b;
};

export { sumar, restar, multiplicar, dividir };
```

**ej8.js (importa):**
```javascript
import { sumar, restar, multiplicar, dividir } from './funciones.js';
```
> Las llaves `{}` son obligatorias para named exports. El nombre debe coincidir exactamente.

### Export por defecto (Default Export) — EJ09:

**persona.js:**
```javascript
export default class Persona {
    constructor(nombre, edad, dni) {
        this._nombre = nombre;
        this._edad = edad;
        this._dni = dni;
    }
    get nombre() { return this._nombre; }
    // ...
}
```

**ej9.js (importa):**
```javascript
import Usuario from './persona.js';
// Puedes ponerle CUALQUIER nombre al importar un default export
```

### En HTML debes usar `type="module"`:
```html
<script src="./ej8.js" type="module"></script>
```

### ¿Cómo se aplica en React?

Cada componente usa export:
```tsx
// Named export (con llaves al importar)
export function BookLogCard({...}) { ... }
// Importar: import { BookLogCard } from './BookLogCard';

// Default export (sin llaves al importar)
export default App;
// Importar: import App from './App';
```

| Tipo | Export | Import |
|---|---|---|
| **Named** | `export { algo }` o `export function algo()` | `import { algo } from '...'` |
| **Default** | `export default algo` | `import loquesea from '...'` |

---

## 7. Métodos Funcionales de Arrays

### ¿Qué son?
Métodos que operan sobre arrays sin modificar el original, usando funciones callback.

### ¿Por qué importan?
Son la base del renderizado de listas en React (`map`) y del filtrado de datos.

### `map()` — Transforma cada elemento (EJ10):
```javascript
const productos = [
    { id: 1, nombre: "Ratón", precio: 20 },
    { id: 2, nombre: "Teclado", precio: 50 }
];

const descripciones = productos.map(producto => 
    `Producto: ${producto.nombre} - ${producto.precio}€`
);
// ["Producto: Ratón - 20€", "Producto: Teclado - 50€"]
```

**En React (BookLogList.tsx):**
```tsx
{items.map((book) => (
    <BookLogCard key={book.id} data={book} onDelete={onDelete} />
))}
```
> `map` transforma cada objeto `book` en un componente React `<BookLogCard>`.

### `filter()` — Filtra elementos que cumplan una condición (EJ10):
```javascript
const productosCaros = productos.filter(producto => producto.precio > 30);
// [{ id: 2, nombre: "Teclado", precio: 50 }]
```

**En React (al eliminar un libro):**
```tsx
setBookLogs(booklogs.filter((book) => book.id !== id));
// Devuelve un NUEVO array sin el libro eliminado
```

### `find()` — Busca el primer elemento que cumpla (EJ10):
```javascript
const raton = productos.find(producto => producto.nombre === "Ratón");
// { id: 1, nombre: "Ratón", precio: 20 }
```

**En React (Tabs.tsx):**
```tsx
const activeItem = items.find((item) => item.id === activeTabId);
```

### `reduce()` — Acumula valores en uno solo (EJ07):
```javascript
const sumar = (...numeros) => numeros.reduce((total, num) => total + num, 0);
//                                              ↑       ↑                ↑
//                                        acumulador  actual    valor inicial
```

### Resumen para el examen:
| Método | Qué devuelve | Para qué |
|---|---|---|
| `map(fn)` | Array nuevo transformado | Renderizar listas en React |
| `filter(fn)` | Array nuevo filtrado | Eliminar elementos, buscar subconjuntos |
| `find(fn)` | Un solo elemento o `undefined` | Buscar un elemento específico |
| `reduce(fn, init)` | Un valor acumulado | Sumar, concatenar, agrupar |

---

## 8. Operadores Lógicos y Cortocircuito

### ¿Qué es?
Los operadores `&&`, `||` y `??` permiten control de flujo inline (sin if/else).

### En tus proyectos React:

**Renderizado condicional con `&&`:**
```tsx
// Solo muestra el badge si isNew es true
{isNew && <span className="badge-new">¡NUEVO!</span>}

// Solo muestra el Timer si showTimer es true
{showTimer && <Timer />}
```
> Si la parte izquierda es `true`, evalúa y devuelve la parte derecha. Si es `false`, no renderiza nada.

**Operador ternario `? :` para dos opciones:**
```tsx
{inStock ? 'Añadir al carrito' : 'Agotado'}

{isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}

{funcionando ? "Parar" : "Iniciar"}
```

**Valor por defecto con `||`:**
```tsx
portadaUrl: portadaUrl || `https://placehold.co/300x400/...`
// Si portadaUrl es "" (falsy), usa el placeholder
```

---

## Resumen Rápido para el Examen

| Concepto | Clave | Ejemplo rápido |
|---|---|---|
| `const` | No reasignable | `const x = 5;` |
| `let` | Reasignable | `let x = 5; x = 10;` |
| Arrow function | `=>`, retorno implícito | `(x) => x * 2` |
| Template literal | Backticks + `${}` | `` `Hola ${nombre}` `` |
| Desestructuración | Extraer de obj/arr | `const { a, b } = obj` |
| Spread | Copiar/expandir | `{...obj, nuevo: true}` |
| Rest | Agrupar resto | `(...args) => ...` |
| Named export | Con llaves | `export { fn }` → `import { fn }` |
| Default export | Sin llaves | `export default fn` → `import fn` |
| `map` | Transforma array | `arr.map(x => x*2)` |
| `filter` | Filtra array | `arr.filter(x => x > 5)` |
| `find` | Busca uno | `arr.find(x => x.id === 1)` |
| `&&` | Renderizado condicional | `{cond && <Comp />}` |
