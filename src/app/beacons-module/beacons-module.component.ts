import { Component, OnInit } from '@angular/core';
import { BeaconService } from '../services/beacon.service';
import { NgForm } from '@angular/forms';
import { Beacon } from '../entidades/beacon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-beacons-module',
  templateUrl: './beacons-module.component.html',
  styleUrls: ['./beacons-module.component.scss']
})
export class BeaconsModuleComponent implements OnInit {

   // Flags
   displayBeacon: boolean;
   displayBeaconModificar: boolean;
   displayMsg: boolean;
   displayMsgAlert: boolean;
 
   // Lista de Beacons.
   beaconList: Beacon[];
 
   // Columnas de la tabla
   cols: any[];
 
   // Beacon seleccionado de la tabla.
   selectedBeaconTable: Beacon;
 
   // Mensaje de alerta.
   msg: string;
 
   // Campos del filtro.
   filtro: string; 

 
   constructor(
     private beaconservice: BeaconService,
     private authService: AuthService
   ) { }
 
   ngOnInit() {
     // Inicialización flags
     this.displayBeacon = false;
     this.displayBeaconModificar = false;
     this.displayMsg = false;
     this.displayMsgAlert = false;
 
     // Inicializamos columnas de la tabla.
     this.cols = [
       { field: 'id', header: 'ID' },
       { field: 'nombre', header: 'Nombre' },
       { field: 'latitud', header: 'Latitud' },
       { field: 'longitud', header: 'Longitud' }
   ];
 
     // Inicializar tabla de Beacons, trayendo todos los datos de firebase.
     // this.Beaconservice.getBeacons();
     this.obtenerBeacons();
     this.resetForm();

   }
   // Agrega Beacons.
   onSubmit(BeaconForm: NgForm){
     if (this.checkForm(BeaconForm)) {
       if (this.displayBeacon && this.displayBeaconModificar) {
         this.modificarBeacon(this.beaconservice.selectedBeacon, BeaconForm);
       } else {
         
         this.beaconservice.añadirBeaconDatabase(this.beaconservice.selectedBeacon, this.authService.userLog);
         this.resetForm(BeaconForm);
         this.displayBeacon = false;
   
         // Modificamos Flag y mensaje.
         this.msg = "El beacon ha sido creado correctamente";
         this.displayMsg = true;
       }
     } else {
       this.msg = "Todos los campos son obligatorios"
       this.displayMsgAlert = true;
     }
   }
 
   checkForm(BeaconForm: NgForm): boolean {
    console.log(BeaconForm);
     if ((BeaconForm.value.id && BeaconForm.value.nombre && BeaconForm.value.latitud 
       && BeaconForm.value.longitud) !== undefined ) {
       if ((BeaconForm.value.id && BeaconForm.value.nombre && BeaconForm.value.latitud 
         && BeaconForm.value.longitud) !== "") {
         return true;
       } else {
         return false;
       }
     } else {
       return false;
     } 
   }
 
   resetForm(BeaconForm?: NgForm)  {
     if(BeaconForm != null) {
       BeaconForm.reset();
       this.beaconservice.selectedBeacon = new Beacon();
     } 
   }
   // Obtener Beacons.
   obtenerBeacons() {
     this.beaconservice.getBeacons()
       .snapshotChanges()
       .subscribe(item => {
         this.beaconList = [];
         item.forEach(element => {
           let x = element.payload.toJSON();
           x['$key'] = element.key;
           console.log(x);
           // Hacemos la comprobación para saber que esa Beacon pertenece al usuario.
           if (x['propietario'] == this.authService.userLog || this.authService.userLog == "jesuselvirasanchez@gmail.com") {
            console.log("cumple la condicion:", x);
            this.beaconList.push(x as Beacon);
           }
           
         });
       });
   }
 
   displayVentanaBeacon(BeaconForm: NgForm) {
     this.displayBeacon = true;
     this.resetForm(BeaconForm);
   }
 
   displayVentanaBeaconModificar(Beacon: Beacon) {
     this.displayBeacon = true;
     this.displayBeaconModificar = true;
     this.beaconservice.selectedBeacon = Beacon;
   
   }
 
   closeVentanaBeacon(BeaconForm: NgForm) {
     this.displayBeacon = false;
     this.displayBeaconModificar = false;
     this.displayMsg = false;
     this.displayMsgAlert = false;
   
     // Limpar las variables también.
     this.resetForm(BeaconForm);
     this.beaconservice.selectedBeacon = new Beacon();
   }
 
   // Elimina al Beacon.
   borrarBeacon() {
     this.beaconservice.borrarBeacon(this.selectedBeaconTable);
   
     // Ponemos el mensaje de Beacon Borrado y activamos el flag de la alerta.
     this.msg = "El Beacon se ha borrado correctamente."
     this.displayMsg = true;
   }
 
   // Modifica información del Beacon.
   modificarBeacon(Beacon: Beacon, BeaconForm: NgForm) {
     // Fijamos el Beacon que queremos borrar.
     this.selectedBeaconTable = Beacon;
     // Modificamos los campos.
     this.selectedBeaconTable.nombre = BeaconForm.value.nombre;
     this.selectedBeaconTable.id = BeaconForm.value.id;
     this.selectedBeaconTable.latitud = BeaconForm.value.latitud;
     this.selectedBeaconTable.longitud = BeaconForm.value.longitud;
     this.selectedBeaconTable.propietario = this.authService.userLog;
 
     console.log(this.selectedBeaconTable);
     this.msg = "El Beacon ha sido modificado correctamente";
     this.displayMsg = true;
     
     this.beaconservice.actualizarBeaconDatabase(this.selectedBeaconTable);
 
     this.closeVentanaBeacon(BeaconForm);
     this.resetForm();
    
   }
   // Busqueda al aplicar el filtro.
   buscarBeacon() {
     let auxBeacons = [];
     // Comprobamos que ningún campo del filtro esté vacio.
     if (this.filtro !== undefined ) {
       if (this.filtro !== "") {
       // Hacemos las consultas desde la lista de Beacons ya obtenidas
       let Beacon = this.beaconList.filter( Beacon => {
 
         if (Beacon.nombre == this.filtro || Beacon.id == this.filtro) {
           //alert (Beacon.email);
           auxBeacons.push(Beacon);
         }
       });
       this.beaconList = auxBeacons;
       } else {
         this.obtenerBeacons();
       }
     } else {
       this.obtenerBeacons();
     }
   }
 
 
   onButtonRemove(Beacon: Beacon) {
     this.selectedBeaconTable = Beacon;
   }
 
   onCloseAlert() {
     this.msg = ""
     this.displayMsg = false;
   }
}
