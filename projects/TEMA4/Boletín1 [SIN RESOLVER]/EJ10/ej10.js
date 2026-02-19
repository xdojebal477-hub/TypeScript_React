const productos = [
    { id: 1, nombre: "Ratón", precio: 20 },
    { id: 2, nombre: "Teclado", precio: 50 }
];  

/*
generamos un nuevo array de objetos cadena que contenga: "Producto: [nombre] - [precio]€"
*/
const descripciones = productos.map(producto => `Producto: ${producto.nombre} - ${producto.precio}€`);

console.log(descripciones);

//a partir del array original genera un nuevo array solo con los productos de precio mayor a 30
const productosCaros = productos.filter(producto => producto.precio > 30);

console.log(productosCaros);
//devuelve el objeto cuyo nombre sea "Ratón"
const raton = productos.find(producto => producto.nombre === "Ratón");

console.log(raton);