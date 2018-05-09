import { Component, OnInit } from '@angular/core';

// Importar servicio Auth
import { AuthService } from "../services/auth.service";

// Importar Router, para redirecionarnos.
import { Router } from "@angular/router";

// Importar componentes comunes
import { NavbarComponent } from "../comun/navbar/navbar.component";

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent implements OnInit {

  // Variables Usuario (Provisional)
  private email: string;
  private password: string;

  // Varoiables de control de datos correctos
  private notAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  onSubmitLogin() {
    this.authService.loginUser(this.email, this.password)
      .then( (res) => {
        console.log(this.email);
        console.log(this.password);
        this.authService.isSignedIn = true;
        this.authService.userLog = this.email;
        this.router.navigate(['principal']);
      }).catch( (err) => {
        console.log("El usuario no existe.")
        this.router.navigate(['']);
        this.notAuthenticated = true;
      })
  }

  onRegistrar() {
    this.router.navigate(['/registrar']);
  }
}
