import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image-service.service';
import { AuthService } from '../services/auth.service';
import { User } from '../entidades/User';
import { Observable } from 'rxjs/Observable';
import { PerfilService } from '../services/perfil.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-module',
  templateUrl: './perfil-module.component.html',
  styleUrls: ['./perfil-module.component.scss']
})
export class PerfilModuleComponent implements OnInit {

  // Variables.
  private userPerfil: User = null;
  private userLog: string;
  private userList: User[];
  //private imageURL: Observable<string> = null;

  constructor(
    private perfilservice: PerfilService,
    private imageservice: ImageService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicializamos las variables.
    this.userLog = this.authservice.userLog;
    this.obtenerUsuario();
  }

  onSubmit(userForm: NgForm) {
    alert(userForm.value.nombre);
  }

  closeModulo() {
    this.router.navigate(['/principal']);
  }

  obtenerUsuario() {
    this.perfilservice.getUsuarios()
      .snapshotChanges()
      .subscribe(item => {
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.userList.push(x as User);
        });
        this.obtenerDatosPerfil();
      });
  }

  obtenerDatosPerfil() {
    this.userList.forEach(element => {
      if(element.email == this.userLog) {
        this.userPerfil = element;
        console.log(this.userPerfil);
      }
    });
  }

}
