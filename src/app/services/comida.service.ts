import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Comida } from '../entidades/comida';

@Injectable()
export class ComidaService {

  // Listado usuarios obtenidos de firebase.
  comidaList: AngularFireList<any>;
  selectedComida: Comida = new Comida();
  
  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getComidas() {
    // Da la tabla de usuarios para manejar los datos
    return this.comidaList = this.firebase.list('Comidas');
  }

  añadirComidaDatabase(comida: Comida, propietario: string, imagen: string) {
    // Lo añadimos a la lista existente de productos.
    this.comidaList.push({
      nombre: comida.nombre,
      tipo: comida.tipo,
      ingredientes: comida.ingredientes,
      descripcion: comida.descripcion,
      imagen: imagen,
      propietario: propietario
    });
  }

  actualizarComidaDatabase(comida: Comida) {
    this.comidaList.update(comida.$key, {
      nombre: comida.nombre,
      tipo: comida.tipo,
      ingredientes: comida.ingredientes,
      descripcion: comida.descripcion,
      imagen: comida.imagen,
      propietario: comida.propietario
    });
  }

  borrarComida(comida: Comida) {
    this.comidaList.remove(comida.$key);
  }
}



