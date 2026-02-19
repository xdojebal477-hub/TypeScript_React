//creamos una calse persona con tres atributos, inclyuendo contructor getters y setters y la exportamos por defecto
export default class Persona {
    constructor(nombre, edad, dni) {
        this._nombre = nombre;
        this._edad = edad;
        this._dni = dni;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get edad() {
        return this._edad;
    }

    set edad(edad) {
        this._edad = edad;
    }

    get dni() {
        return this._dni;
    }

    set dni(dni) {
        this._dni = dni;
    }
}   