import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../entidades/user';

@Injectable()
export class PerfilService {

  // Listado usuarios obtenidos de firebase.
  userList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getUsuarios() {
    // Da la tabla de usuarios para manejar los datos
    if(this.userList === undefined) {
      this.userList = this.firebase.list('Usuarios');
      return this.userList;
    } else {
      return this.userList;
    }  
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
}
