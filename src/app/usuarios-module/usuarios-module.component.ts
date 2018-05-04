import { Component, OnInit } from '@angular/core';
import { User } from '../entidades/user';
import { NgForm } from "@angular/forms";

// Importamos nservicio del cliente.
import { UserService } from '../services/user.service';
import { element } from 'protractor';

@Component({
  selector: 'app-usuarios-module',
  templateUrl: './usuarios-module.component.html',
  styleUrls: ['./usuarios-module.component.scss']
})
export class UsuariosModuleComponent implements OnInit {

  // Flags
  displayUsuario: boolean;
  displayUsuarioModificar: boolean;
  displayMsg: boolean;
  displayMsgAlert: boolean;

  // Lista de usuarios.
  userList: User[];

  // Columnas de la tabla
  cols: any[];

  // Usuario seleccionado de la tabla.
  selectedUserTable: User;

  // Mensaje de alerta.
  msg: string;

  // Campos del filtro.
  email: string; 
  nombre: string;
  apellidos: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // Inicialización flags
    this.displayUsuario = false;
    this.displayUsuarioModificar = false;
    this.displayMsg = false;
    this.displayMsgAlert = false;

    // Inicializamos columnas de la tabla.
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'apodo', header: 'Apodo' },
      { field: 'email', header: 'Email' }
  ];

    // Inicializar tabla de usuarios, trayendo todos los datos de firebase.
    // this.userService.getUsuarios();
    this.obtenerUsuarios();
    this.resetForm();
  }
  // Agrega usuarios.
  onSubmit(userForm: NgForm){
    if (this.checkForm(userForm)) {
      if (this.displayUsuario && this.displayUsuarioModificar) {
        this.modificarUsuario(this.userService.selectedUser, userForm);
      } else {
        this.userService.añadirUsuarioDatabase(userForm.value);
        this.resetForm(userForm);
        this.displayUsuario = false;
  
        // Modificamos Flag y mensaje.
        this.msg = "El usuario ha sido creado correctamente";
        this.displayMsg = true;
      }
    } else {
      this.msg = "Todos los campos son obligatorios"
      this.displayMsgAlert = true;
    }
  }

  checkForm(userForm: NgForm): boolean {
    if ((userForm.value.nombre && userForm.value.apellidos && userForm.value.email && userForm.value.apodo && userForm.value.password) !== undefined ) {
      if ((userForm.value.nombre && userForm.value.apellidos && userForm.value.email && userForm.value.apodo && userForm.value.password) !== "") {
      
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    } 
  }

  onFilter() {
    
  }

  resetForm(userForm?: NgForm)  {
    if(userForm != null) {
      userForm.reset();
      this.userService.selectedUser = new User();
    }
  }
  // Obtener usuarios.
  obtenerUsuarios() {
    this.userService.getUsuarios()
      .snapshotChanges()
      .subscribe(item => {
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.userList.push(x as User);
        })
      });
  }

  displayVentanaUsuario(userForm: NgForm) {
    this.displayUsuario = true;
    // Limpar las variables también y cerrar ventana.
    this.resetForm(userForm);
  }

  displayVentanaUsuarioModificar(user: User) {
    this.displayUsuario = true;
    this.displayUsuarioModificar = true;
    // Ponemos los datos del usuario en el form.
    this.userService.selectedUser = user;
  
  }

  closeVentanaUsuario(userForm: NgForm) {
    this.displayUsuario = false;
    this.displayUsuarioModificar = false;
    this.displayMsg = false;
    this.displayMsgAlert = false;
  
    // Limpar las variables también.
    this.resetForm(userForm);
    this.userService.selectedUser = new User();
  }

  // Elimina al usuario.
  borrarUsuario() {
    this.userService.borrarUsuario(this.selectedUserTable);
  
    // Ponemos el mensaje de usuario Borrado y activamos el flag de la alerta.
    this.msg = "El usuario se ha borrado correctamente."
    this.displayMsg = true;
  }

  // Modifica información del usuario.
  modificarUsuario(user: User, userForm: NgForm) {
    // Fijamos el usuario que queremos borrar.
    this.selectedUserTable = user;
    // Modificamos los campos.
    this.selectedUserTable.nombre = userForm.value.nombre;
    this.selectedUserTable.apellidos = userForm.value.apellidos;
    this.selectedUserTable.email = userForm.value.email;
    this.selectedUserTable.apodo = userForm.value.apodo;
    this.selectedUserTable.password = userForm.value.password;


    this.msg = "El usuario ha sido modificado correctamente";
    this.displayMsg = true;
    
    this.userService.actualizarUsuarioDatabase(this.selectedUserTable);

    this.closeVentanaUsuario(userForm);
    this.resetForm();
   
  }

  // Pasa los datos del usuario a borrar
  onButtonRemove(user: User) {
    // Fijamos el usuario que queremos borrar.
    this.selectedUserTable = user;
  }

  onCloseAlert() {
    this.msg = ""
    this.displayMsg = false;
  }
}
