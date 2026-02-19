//Crea una función que reciba un objeto usuario (con nombre e imagen)
//y devuelva por consola un string que simule una tarjeta HTML usando Template Literals.
const usuario={
    nombre: 'Ana',
    imagen: 'https://www.example.com/imagen.jpg'
};
const tarjetaUsuario=(usuario) => `
<div class="card">
    <h2>${usuario.nombre}</h2>
    <img src="${usuario.imagen}" alt="Imagen de ${usuario.nombre}">
</div>
`;
console.log(tarjetaUsuario(usuario));