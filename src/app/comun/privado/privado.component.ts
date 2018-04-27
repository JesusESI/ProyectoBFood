import { Component, OnInit } from '@angular/core';

// Importar Router, para redirecionarnos.
import { Router } from "@angular/router";

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onVolver() {
    this.router.navigate(['']);
  }
}
