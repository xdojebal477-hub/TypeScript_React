# 📘 Guía 2: Asincronía, Fetch API y localStorage

> **Basada en los ejercicios del Boletín 1 (TEMA4, EJ11–EJ21)**
> Todo sobre Promesas, async/await, consumo de APIs y persistencia en el navegador.

---

## 1. Promesas (Promises) — EJ11

### ¿Qué es una Promesa?
Un objeto que representa un **valor futuro** — algo que todavía no ha terminado pero que eventualmente tendrá un resultado (éxito o error).

### ¿Por qué existen?
JavaScript es **single-threaded** (un solo hilo). Si hiciéramos una petición a un servidor de forma síncrona, la página se congelaría hasta recibir respuesta. Las promesas permiten decir: "haz esto, y cuando termines, avísame".

### Los 3 estados de una Promesa:
```
┌──────────┐
│ PENDING  │  ← Estado inicial, esperando...
└────┬─────┘
     │
     ├──→ ┌──────────┐
     │    │ FULFILLED │  ← Éxito (resolve)
     │    └──────────┘
     │
     └──→ ┌──────────┐
          │ REJECTED  │  ← Error (reject)
          └──────────┘
```

### ¿Cómo funciona? (EJ11)

```javascript
// 1. CREAR una promesa
let promise = new Promise(function (resolve, reject) {
    // resolve = función que llamar si todo va bien
    // reject  = función que llamar si algo falla
    setTimeout(gestionarPromesa, 2000, resolve, reject);
});

// 2. CONSUMIR la promesa con .then()
promise.then(
    (result) => mostrarResultado(result),   // si se resolvió (resolve)
    (error) => mostrarResultado(error)      // si se rechazó (reject)
);
```

### Flujo del EJ11 paso a paso:
1. El usuario hace click en "Iniciar Promesa"
2. Se crea una promesa con un `setTimeout` de 2 segundos
3. Si el usuario pulsa "Procesar Promesa" ANTES de los 2 segundos → `promesaFinalizada = true`
4. Cuando pasan los 2 segundos:
   - Si `promesaFinalizada === true` → `resolve(mensaje de éxito)`
   - Si `promesaFinalizada === false` → `reject(mensaje de error)`

### ¿Por qué es interactivo?
El ejercicio te enseña que la promesa se ejecuta **asíncronamente**. El código no se detiene esperando; el usuario puede seguir interactuando.

---

## 2. Async / Await — EJ12

### ¿Qué es?
`async/await` es **azúcar sintáctica** (syntactic sugar) sobre las promesas. Hace el código asíncrono más legible, como si fuera síncrono.

### ¿Por qué importa?
- `.then().then().then()` se vuelve difícil de leer (callback hell)
- `async/await` es lineal y fácil de seguir

### Comparación directa:

**Con `.then()` (EJ11):**
```javascript
promise.then(
    (result) => mostrarResultado(result),
    (error) => mostrarResultado(error)
);
```

**Con `async/await` (EJ12):**
```javascript
async function muestraMensaje() {
    let promise = new Promise(function (resolve) {
        setTimeout(function () {
            resolve(document.getElementById("msjExito").value);
        }, 2000);
    });
    
    // 'await' PAUSA esta función hasta que la promesa se resuelva
    document.getElementById("salida").innerHTML = await promise;
}
```

### Las reglas de `async/await`:
1. **`async`** se pone ANTES de `function` → marca la función como asíncrona
2. **`await`** se pone ANTES de una promesa → pausa la ejecución hasta que se resuelva
3. `await` SOLO puede usarse dentro de una función `async`
4. Una función `async` siempre devuelve una Promesa

### Patrón `try/catch` para errores:
```javascript
async function atacarAPIRest() {
    try {
        const response = await fetch('https://...');           // espera la respuesta
        if (!response.ok) throw new Error(`Error ${response.status}`); // valida
        const datos = await response.json();                   // espera el parseo
        generarLista(datos);
    } catch (error) {
        console.log(error);  // captura cualquier error
    }
}
```
> `try/catch` con `async/await` reemplaza al `.catch()` de las promesas.

---

## 3. Fetch API — EJ13, EJ14, EJ15

### ¿Qué es?
La API nativa del navegador para hacer peticiones HTTP (reemplaza al viejo `XMLHttpRequest`/AJAX).

### ¿Por qué importa?
Es la base de toda comunicación con servidores y APIs en aplicaciones web modernas.

### Anatomía de un `fetch`:
```javascript
fetch(url)              // 1. Devuelve una PROMESA con la Response
    .then(res => res.text())  // 2. Devuelve otra PROMESA con el cuerpo
    .then(data => ...)        // 3. Aquí tienes los datos
    .catch(err => ...)        // 4. Manejo de errores
```

> `fetch` devuelve una promesa. `response.json()` o `response.text()` también devuelve una promesa. Por eso necesitas dos `.then()` o dos `await`.

### EJ13 — Leer un fichero de texto:
```javascript
function procesarFichero() {
    const fichero = formulario.nombreFichero.value.trim();
    
    fetch(fichero)                              // pide el fichero
        .then((response) => response.text())    // lo convierte a texto
        .then(addTextoCapa)                     // lo muestra en el DOM
        .catch(console.log);                    // captura errores
}
```
> Aquí se usa `response.text()` porque el contenido es texto plano.

### EJ14 — Consumir API REST (response como texto → JSON.parse):
```javascript
function procesarFichero() {
    const url = formulario.url.value.trim();
    
    fetch(url)
        .then((response) => response.text())     // obtiene texto crudo
        .then(mostrarObjetoConsola)
        .catch(console.log);
}

const mostrarObjetoConsola = (texto) => {
    let listaUsuarios = JSON.parse(texto).results;  // parsea manualmente
    console.log(listaUsuarios);
};
```

### EJ15 — API REST con `async/await` y `response.json()`:
```javascript
async function atacarAPIRest() {
    try {
        const response = await fetch('https://picsum.photos/list');
        
        if (!response.ok) {
            throw new Error(`Error en la peticion ${response.status}`);
        }
        
        const imagenes = await response.json();  // parsea directamente a objeto JS
        generarLista(imagenes);
    } catch (error) {
        console.log(error);
    }
}
```

### Diferencia clave: `.text()` vs `.json()`:
| Método | Devuelve | Cuándo usar |
|---|---|---|
| `response.text()` | String crudo | Ficheros de texto, HTML |
| `response.json()` | Objeto JS (ya parseado) | APIs REST que devuelven JSON |

### Validar la respuesta:
```javascript
if (!response.ok) {
    throw new Error(`Error ${response.status}`);
}
```
> `fetch` **NO** lanza error automáticamente si el servidor responde con 404 o 500. Solo falla si hay un problema de red. Por eso verificamos `response.ok`.

---

## 4. CRUD con Firebase REST API — EJ16, EJ17, EJ18, EJ19

### ¿Qué es?
Firebase Realtime Database expone una API REST que puedes atacar con `fetch`. Esto es un CRUD completo (Create, Read, Update, Delete).

### El patrón de URL de Firebase:
```
https://tu-proyecto.firebasedatabase.app/coleccion.json
https://tu-proyecto.firebasedatabase.app/coleccion/idRegistro.json
```

### READ (GET) — EJ16:
```javascript
async function atacarAPIRest() {
    try {
        const response = await fetch(
            "https://dani-demo-ajax-default-rtdb.europe-west1.firebasedatabase.app/.json"
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const datos = await response.json();
        capaSalida.innerHTML = JSON.stringify(datos, null, 2);
    } catch (error) {
        console.log(error);
    }
}
```
> `fetch(url)` sin segundo parámetro = método GET por defecto.

### CREATE (POST) — EJ17:
```javascript
async function insertarAlumno(event) {
    event.preventDefault();  // ¡Evita que el formulario recargue la página!
    
    const nuevoAlumno = { apellidos, nombre, edad, id };
    
    const response = await fetch(apiRest + fichero, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(nuevoAlumno),  // convierte objeto JS a JSON string
    });
    
    const datos = await response.json();  // Firebase devuelve el id generado
}
```

### UPDATE (PATCH) — EJ18:
```javascript
async function actualizarAlumno(event) {
    event.preventDefault();
    const datos = { apellidos: apellidos, edad: edad };
    
    const response = await fetch(apiRest + "alumnos/" + idFirebase + ".json", {
        method: "PATCH",          // PATCH = actualización parcial
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(datos),
    });
}
```
> `PATCH` solo actualiza los campos que envías. `PUT` reemplazaría TODO el registro.

### DELETE — EJ19:
```javascript
function eliminarAlumno(event) {
    event.preventDefault();
    
    fetch(apiRest + "alumnos/" + idFirebase + ".json", { 
        method: "DELETE" 
    }).then((res) => res.json());
}
```

### Resumen de métodos HTTP:
| Operación | Método HTTP | Qué hace |
|---|---|---|
| Leer | `GET` (por defecto) | Obtiene datos |
| Crear | `POST` | Añade un nuevo registro |
| Actualizar | `PATCH` | Modifica campos específicos |
| Eliminar | `DELETE` | Borra un registro |

### Configuración del `fetch` para escritura:
```javascript
fetch(url, {
    method: "POST",                                         // método HTTP
    headers: { "Content-Type": "application/json;charset=utf-8" },  // tipo del body
    body: JSON.stringify(objetoJS),                         // datos como JSON string
});
```

### `event.preventDefault()` — ¿Por qué?
Los formularios HTML por defecto **recargan la página** al hacer submit. `event.preventDefault()` cancela ese comportamiento para que podamos manejar el envío con JavaScript.

---

## 5. localStorage — EJ20, EJ21

### ¿Qué es?
Un almacenamiento **persistente** en el navegador del usuario. Los datos sobreviven al cerrar la pestaña, el navegador e incluso reiniciar el ordenador.

### ¿Por qué importa?
Para guardar **preferencias del usuario** (tema oscuro, idioma, carrito de compra) sin necesidad de un servidor.

### API de localStorage:
```javascript
// Guardar un string
localStorage.setItem("clave", "valor");

// Leer un string
const valor = localStorage.getItem("clave");  // "valor" o null si no existe

// Eliminar una clave
localStorage.removeItem("clave");

// Borrar TODO
localStorage.clear();
```

### EJ20 — Tema claro/oscuro con localStorage:

```javascript
// 1. Al cargar la página, LEER la preferencia guardada
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Modo Claro";
}

// 2. Al hacer click, CAMBIAR y GUARDAR
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");    // guardar preferencia
        toggleBtn.textContent = "☀️ Modo Claro";
    } else {
        localStorage.setItem("theme", "light");   // guardar preferencia
        toggleBtn.textContent = "🌙 Modo Oscuro";
    }
});
```

### El flujo:
```
Usuario abre la página
    → Lee localStorage.getItem("theme")
    → Si es "dark", aplica la clase CSS
    
Usuario hace click en el botón
    → Toggle la clase CSS
    → Guarda la nueva preferencia en localStorage
    
Usuario cierra y reabre la página
    → La preferencia se mantiene ✅
```

### EJ21 — Guardar objetos complejos (Carrito de compra):

**⚠️ localStorage SOLO almacena strings.** Para guardar objetos/arrays, necesitas:

```javascript
// GUARDAR un array/objeto:
localStorage.setItem("shopping_cart", JSON.stringify(cartArray));
//                                    ↑ convierte array → string JSON

// LEER un array/objeto:
const cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
//           ↑ convierte string JSON → array       ↑ si es null, usa []
```

### Patrón completo del carrito (lo que deberías implementar en EJ21):

```javascript
const CART_KEY = "shopping_cart";

// Obtener carrito del localStorage
function getCart() {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Añadir producto al carrito
function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart(cart);
}

// Vaciar carrito
clearBtn.addEventListener("click", () => {
    localStorage.removeItem(CART_KEY);
    renderCart([]);
});
```

### Limitaciones de localStorage:
- Solo almacena **strings** (necesitas `JSON.stringify`/`JSON.parse`)
- Máximo **~5MB** por dominio
- Es **síncrono** (bloquea el hilo principal, pero es rápido para datos pequeños)
- Solo accesible desde el **mismo dominio** (misma política de origen)
- **NO es seguro** para datos sensibles (contraseñas, tokens)

---

## 6. Manipulación del DOM con JavaScript — Patrones comunes en los ejercicios

### Obtener elementos:
```javascript
document.getElementById("salida");           // por ID
document.querySelector(".card");              // por selector CSS (primero)
document.querySelectorAll(".card");           // todos los que coincidan
```

### Crear elementos dinámicos (EJ17):
```javascript
let tabla = document.createElement("table");
let cabecera = document.createElement("thead");
cabecera.innerHTML = "<th>Id</th><th>Apellidos</th>";
tabla.append(cabecera);

// Insertar filas dinámicamente
for (let alumno of listaAlumnos) {
    fila = tabla.insertRow();
    celda = fila.insertCell();
    celda.textContent = alumno.nombre;
}

capaSalida.append(tabla);  // insertar en el DOM
```

### Event listeners:
```javascript
// Forma moderna (addEventListener)
document.getElementById("btn").addEventListener("click", miFuncion);

// En formularios
formNuevoAlumno.addEventListener("submit", insertarAlumno);
```

---

## Resumen para el Examen — Cheat Sheet

```
PROMESA:
  new Promise((resolve, reject) => { ... })
  .then(resultado => ...)
  .catch(error => ...)

ASYNC/AWAIT:
  async function nombre() {
      try {
          const data = await promesa;
      } catch (error) { ... }
  }

FETCH (GET):
  const response = await fetch(url);
  const data = await response.json();

FETCH (POST):
  await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(objeto)
  });

LOCALSTORAGE:
  localStorage.setItem("key", "string")
  localStorage.getItem("key")  // → string o null
  JSON.stringify(obj) → para guardar objetos
  JSON.parse(string)  → para recuperar objetos
```
