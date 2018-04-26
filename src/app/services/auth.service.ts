import { Injectable } from '@angular/core';

// Import de dependencias con firebase.
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

// Este import proporciona la capacidad de hacer llamadas asincronas que permite tener los datos actualizados en tiempo real.
import 'rxjs/add/operator/map';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class AuthService {

  // Variable de sesión.
   private _isSignedIn: boolean;

  // Inyección de dependencias.
  constructor(
    public serviceAuth: AngularFireAuth,
  ) { }

  get isSignedIn(): boolean {
    return this._isSignedIn;
  }

  set isSignedIn(signed: boolean) {
    this._isSignedIn = signed;
  }

  // Consultar metodos en la página de firebase --> guías.
  logout(){
    // Método de auth que cierra la sesión
    return this.serviceAuth.auth.signOut();
  }

  // Registrar usuario
  registerUser (email: string, pass: string) {
    //  Cada objeto Promise tiene una respuesta tanto de ok como de error, controlada mediante manejador.
    return new Promise((resolve, reject) => {
      this.serviceAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( 
        userData => resolve(userData),
        err => reject(err))
    });
  }

  // Loguearse con email y password
  loginUser (email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.serviceAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( 
        userData => resolve(userData),
        err => reject(err))
    });
  }

  // Devolver datos usuario(Log).
  getDataUser() {
    return this.serviceAuth.authState.map( auth => auth);
  }
}
