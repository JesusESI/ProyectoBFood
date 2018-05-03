import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database/database";

import { User } from '../entidades/user';

@Injectable()
export class UserService {

  // Listado usuarios obtenidos de firebase.
  userList: AngularFireList<any>;

  constructor(
    public firebase: AngularFireDatabase
  ) { }

  getUsuarios() {
    return this.userList = this.firebase.list('usuarios');
  }

  añadirUsuarioDatabase(usuario: User) {
    // Lo añadimos a la lista existente de productos.
    this.userList.push({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos
      
    });
  }

  actualizarUsuarioDatabase(usuario: User) {
    this.userList.update(usuario.email, {
      nombre: usuario.nombre, 
      apellidos: usuario.apellidos,
      email: usuario.email
    });
  }

  borrarUsuario(usuario: User) {
    this.userList.remove(usuario.email);
  }

}
