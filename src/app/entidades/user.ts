import { Observable } from "rxjs/Observable";

export class User {

    $key: string;
    nombre: string;
    apellidos: string;
    email: string;
    apodo: string;
    password: string;
    // UrlImagen
    imagen: string;
    // Variaboles de control para eventos aceptados.
    eventosAceptados: number;
    eventosNoAceptados: number;

    constructor() {}

}