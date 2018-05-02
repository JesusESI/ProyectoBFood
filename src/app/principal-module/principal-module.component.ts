import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-module',
  templateUrl: './principal-module.component.html',
  styleUrls: ['./principal-module.component.scss']
})
export class PrincipalModuleComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickUsuarios() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/gestionarUsuarios']);
  }

  onClickSignal() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/gestionarBeacons']);
  }

  onClickEstadisticas() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/estadisticas']);
  }

  onClickEventos() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/gestionarEventos']);
  }

  onClickComidas() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/gestionarComidas']);
  }

  onClickPerfil() {
    //alert("Esto funciona.");
    this.router.navigate(['principal/administrarPerfil']);
  }
}
