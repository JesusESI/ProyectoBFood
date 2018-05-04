import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { User } from '../entidades/user';

@Injectable()
export class UserService {

  // Listado usuarios obtenidos de firebase.
  userList: AngularFireList<any>;
  selectedUser: User = new User(); 

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getUsuarios() {
    // Da la tabla de usuarios para manejar los datos
    return this.userList = this.firebase.list('Usuarios');
  }

  añadirUsuarioDatabase(usuario: User) {
    // Lo añadimos a la lista existente de productos.
    this.userList.push({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      apodo: usuario.apodo,
      email: usuario.email,
      password: usuario.password
    });
  }

  actualizarUsuarioDatabase(usuario: User) {
    this.userList.update(usuario.$key, {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      apodo: usuario.apodo,
      email: usuario.email,
      password: usuario.password
    });
  }

  borrarUsuario(usuario: User) {
    this.userList.remove(usuario.$key);
  }
}
