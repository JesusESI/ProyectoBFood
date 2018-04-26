import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // El objetivo es prohibir el accesso a ciertas rutas de la aplicación sin haberse logueado antes.
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /*return this.authService.serviceAuth.authState
      .take(1)
      .map(response => !! response)
      .do( authenticated => {
        if( !authenticated ){
          this.router.navigate(['']);
        }
      });*/
      // Comprobando auth guard.
      console.log("Comprobando guard auth", this.authService.isSignedIn)
      if (this.authService.isSignedIn) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
}
