import { Component, OnInit } from '@angular/core';

// Importar Router, para redirecionarnos.
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrado-correctamente',
  templateUrl: './registrado-correctamente.component.html',
  styleUrls: ['./registrado-correctamente.component.scss']
})
export class RegistradoCorrectamenteComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onVolver() {
    this.router.navigate(['']);
  }

}
