// --- 1. REFERENCIAS AL DOM ---
const cartList = document.getElementById("cart-list");
const cartCounter = document.getElementById("cart-counter");
const debugContent = document.getElementById("debug-content");
const clearBtn = document.getElementById("clear-btn");

// Clave constante para evitar erratas ("magic strings")
const CART_KEY = "shopping_cart";

// --- 2. FUNCIÓN DE RENDERIZADO (VISUALIZACIÓN) ---
// Esta función se encarga de pintar el array en pantalla.
const renderCart = (cartArray) => {
  // A. Actualizamos el contador rojo
  cartCounter.textContent = cartArray.length;

  // B. Actualizamos el Panel de Debug (Didáctico)
  // Esto muestra a los alumnos cómo se ve el texto real en la memoria
  debugContent.textContent = JSON.stringify(cartArray, null, 2);

  // C. Limpiamos la lista actual para repintarla
  cartList.innerHTML = "";

  // D. Si está vacío, mostramos mensaje
  if (cartArray.length === 0) {
    cartList.innerHTML =
      '<li style="color: #999; text-align: center;">Carrito vacío</li>';
    return;
  }

  // E. Generamos el HTML para cada producto
  cartArray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
                <span style="font-weight:500">${item.name}</span> 
                <span style="color:#e74c3c">${item.price}€</span>
            `;
    cartList.append(li);
  });
};

// --- 3. LÓGICA DE LOCALSTORAGE (SOLUCIÓN) ---
// TU CÓDIGO AQUÍ

// --- 4. INICIALIZACIÓN ---
// Al abrir la página, leemos lo que hay y lo pintamos
const initialCart = getCart();
renderCart(initialCart);
