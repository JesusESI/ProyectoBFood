import { Component, OnInit } from '@angular/core';
import { User } from '../entidades/user';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuarios-module',
  templateUrl: './usuarios-module.component.html',
  styleUrls: ['./usuarios-module.component.scss']
})
export class UsuariosModuleComponent implements OnInit {

  // Prueba.
  usuarios: User[] = [];
  usuario1: User = new User();
  usuario2: User = new User();
  usuario3: User = new User();
  cols: any[];

  // Flags
  displayUsuario: boolean;

  constructor(
  ) { }

  ngOnInit() {
    // Inicialización flags
    this.displayUsuario = false;

    // Prueba
    this.cols = [
      {field: 'nombre', header: 'Nombre'},
      {field: 'apellidos', header: 'Apellidos'},
      {field: 'email', header: 'Email'},
    ];

    this.usuario1.nombre = "Jesus";
    this.usuario1.apellidos = "Elvira Sáncheez";
    this.usuario1.email = "jesuselvirasanchez@gmail.com";

    this.usuario2.nombre = "Julian";
    this.usuario2.apellidos = "Julian Sáncheez";
    this.usuario2.email = "julian@gmail.com";

    this.usuario3.nombre = "Jaimito";
    this.usuario3.apellidos = "Jaimito Gómez";
    this.usuario3.email = "jaimito@gmail.com";

    this.usuarios.push(this.usuario1);
    this.usuarios.push(this.usuario2);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
    this.usuarios.push(this.usuario3);
  }

  displayVentanaUsuario() {
    this.displayUsuario = true;
  }

  closeVentanaUsuario() {
    this.displayUsuario = false;
  }
}
