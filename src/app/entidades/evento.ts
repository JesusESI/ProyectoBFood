import { Beacon } from "./beacon";
import { Comida } from "./comida";

export class Evento {
    $key: string;
    nombre: string;
    descripcion: string;
    restaurante: string;
    tipo: string;
    FechaInicio: Date;
    FechaFin: Date;
    beacon: Beacon;
    comidas: Comida[];
    // Variable de estadisticas.
    vecesNotificado: number;
    // Variable para controlar de quien es.
    propietario: string;

}