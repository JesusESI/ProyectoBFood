import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { User } from '../entidades/user';
import { Query } from '@firebase/database/dist/src/api/Query';
import { FirebaseDatabase } from '@firebase/database-types';
import { query } from '@angular/animations';

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
    if(this.userList === undefined) {
      return this.userList = this.firebase.list('Usuarios');
    } else {
      return this.userList;
    }  
  }

  añadirUsuarioDatabase(usuario: User, imagen: string) {
    // Lo añadimos a la lista existente de productos.
    this.userList.push({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      apodo: usuario.apodo,
      email: usuario.email,
      password: usuario.password,
      imagen: imagen
    });
  }

  actualizarUsuarioDatabase(usuario: User) {
    this.userList.update(usuario.$key, {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      apodo: usuario.apodo,
      email: usuario.email,
      password: usuario.password, 
      imagen: usuario.imagen
    });
  }

  borrarUsuario(usuario: User) {
    this.userList.remove(usuario.$key);
  }
}
