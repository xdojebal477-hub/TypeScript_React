const user={
    nombre:"Pedro",
    email:"pedro@email.com"
};
//funcion para mostrar el usuario y destructurar el objeto
const mostrarUsuario=(user)=>{
    const {nombre,email}=user;
    let rol="invitado";
    return `Nombre: ${nombre}, Email: ${email}, Rol: ${rol}`;
}
console.log(mostrarUsuario(user));