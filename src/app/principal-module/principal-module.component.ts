import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-module',
  templateUrl: './principal-module.component.html',
  styleUrls: ['./principal-module.component.scss']
})
export class PrincipalModuleComponent implements OnInit {
  // Imagen loading.
  //load: boolean = true;
  //paginaActive: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Timer para mostrar la animacion de loading.
    // let timerGift = setTimeout(() => 
    //   this.load = false , 4000
    // );

    // let timerPagina = setTimeout(() =>
    // this.paginaActive = true, 4000
    // );
  }

  onClickUsuarios() {
    this.router.navigate(['principal/gestionarUsuarios']);
  }

  onClickSignal() {
    this.router.navigate(['principal/gestionarBeacons']);
  }

  onClickEstadisticas() {
    this.router.navigate(['principal/estadisticas']);
  }

  onClickEventos() {
    this.router.navigate(['principal/gestionarEventos']);
  }

  onClickComidas() {
    this.router.navigate(['principal/gestionarComidas']);
  }

  onClickPerfil() {
    this.router.navigate(['principal/administrarPerfil']);
  }
}
