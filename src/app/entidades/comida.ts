export class Comida {
    $key: string;
    nombre: string;
    tipo: string;
    ingredientes: string;
    descripcion: string;
    // Valor por defecto.
    imagen: string = "IconoComida.png";
    // Usuario que la ha creado.
    propietario: string;
}