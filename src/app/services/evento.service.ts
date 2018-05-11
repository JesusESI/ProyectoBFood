import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Evento } from '../entidades/evento';

@Injectable()
export class EventoService {

   // Listado usuarios obtenidos de firebase.
   eventoList: AngularFireList<any>;
   selectedEvent: Evento = new Evento();
 
   constructor(
     private firebase: AngularFireDatabase
   ) { }
 
   getEventos() {
     // Da la tabla de usuarios para manejar los datos
     if(this.eventoList === undefined) {
       return this.eventoList = this.firebase.list('Eventos');
     } else {
       return this.eventoList;
     }  
   }
   
   añadirEventoDatabase(evento: Evento) {
     // Lo añadimos a la lista existente de productos.

     // TODO. Comprobar si firebase permite almacenar estructuras de objetos
     this.eventoList.push({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      restaurante: evento.restaurante,
      tipo: evento.tipo,
      FechaInicio: evento.FechaInicio.toLocaleDateString()+ " " + evento.FechaInicio.toLocaleTimeString(),
      FechaFin: evento.FechaFin.toLocaleDateString()+ " " + evento.FechaInicio.toLocaleTimeString(),
      beacon: evento.beacon,
      comidas: evento.comidas,
      propietario: evento.propietario
     });
   }
 
   actualizarEventoDatabase(evento: Evento) {
     this.eventoList.update(evento.$key, {
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      restaurante: evento.restaurante,
      tipo: evento.tipo,
      FechaInicio: evento.FechaInicio.toLocaleDateString()+ " " + evento.FechaInicio.toLocaleTimeString(),
      FechaFin: evento.FechaFin.toLocaleDateString()+ " " + evento.FechaInicio.toLocaleTimeString(),
      beacon: evento.beacon,
      comidas: evento.comidas,
      propietario: evento.propietario
     });
   }
 
   borrarEvento(evento: any) {
     this.eventoList.remove(evento.$key);
   }

}
