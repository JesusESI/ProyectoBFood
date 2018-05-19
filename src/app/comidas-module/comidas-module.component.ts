import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image-service.service';
import { Comida } from '../entidades/comida';
import { ComidaService } from '../services/comida.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-Comidas-module',
  templateUrl: './Comidas-module.component.html',
  styleUrls: ['./Comidas-module.component.scss']
})
export class ComidasModuleComponent implements OnInit {

   // Flags
   displayComida: boolean;
   displayComidaModificar: boolean;
   displayMsg: boolean;
   displayMsgAlert: boolean;
 
   // Lista de Comidas.
   comidaList: Comida[];
 
   // Columnas de la tabla
   cols: any[];
 
   // Comida seleccionado de la tabla.
   selectedComidaTable: Comida;
 
   // Mensaje de alerta.
   msg: string;
 
   // Campos del filtro.
   filtro: string; 
 
   // Nombre imagen;
   imagen: string;
 
   constructor(
     private comidaservice: ComidaService,
     private authService: AuthService,
     private imageService: ImageService
   ) { }
 
   ngOnInit() {
     // Inicialización flags
     this.displayComida = false;
     this.displayComidaModificar = false;
     this.displayMsg = false;
     this.displayMsgAlert = false;
 
     // Inicializamos columnas de la tabla.
     this.cols = [
       { field: 'nombre', header: 'Nombre' },
       { field: 'tipo', header: 'Tipo' },
       { field: 'ingredientes', header: 'Ingredientes' },
       { field: 'descripcion', header: 'Descripcion' }
   ];
 
     // Inicializar tabla de Comidas, trayendo todos los datos de firebase.
     // this.comidaservice.getComidas();
     this.obtenerComidas();
     this.resetForm();

     // Por defecto tipo de comida.
     this.comidaservice.selectedComida.tipo = "Variada"

   }
   // Agrega Comidas.
   onSubmit(ComidaForm: NgForm){
     if (this.checkForm(ComidaForm)) {
       if (this.displayComida && this.displayComidaModificar) {
         this.modificarComida(this.comidaservice.selectedComida, ComidaForm);
       } else {

         this.comidaservice.selectedComida.nombre = ComidaForm.value.nombre
         this.comidaservice.selectedComida.tipo = ComidaForm.value.tipo;
         this.comidaservice.selectedComida.ingredientes = ComidaForm.value.ingredientes;
         this.comidaservice.selectedComida.descripcion = ComidaForm.value.descripcion;
         this.comidaservice.selectedComida.propietario = this.authService.userLog;
        
         this.comidaservice.añadirComidaDatabase(this.comidaservice.selectedComida, this.authService.userLog, this.imagen);
         this.resetForm(ComidaForm);
         this.displayComida = false;
   
         // Modificamos Flag y mensaje.
         this.msg = "El plato ha sido creado correctamente";
         this.displayMsg = true;
       }
     } else {
       this.msg = "Todos los campos son obligatorios"
       this.displayMsgAlert = true;
     }
   }
 
   checkForm(ComidaForm: NgForm): boolean {
    //console.log(ComidaForm);
     if ((ComidaForm.value.nombre && ComidaForm.value.tipo && ComidaForm.value.ingredientes 
       && ComidaForm.value.descripcion) !== undefined ) {
       if ((ComidaForm.value.nombre && ComidaForm.value.tipo && ComidaForm.value.ingredientes 
         && ComidaForm.value.descripcion) !== "") {
         return true;
       } else {
         return false;
       }
     } else {
       return false;
     } 
   }
 
   resetForm(ComidaForm?: NgForm)  {
     if(ComidaForm != null) {
       ComidaForm.reset();
       this.comidaservice.selectedComida = new Comida();
     }
      this.imagen = undefined;     
   }
   // Obtener Comidas.
   obtenerComidas() {
     this.comidaservice.getComidas()
       .snapshotChanges()
       .subscribe(item => {
         this.comidaList = [];
         item.forEach(element => {
           let x = element.payload.toJSON();
           x['$key'] = element.key;
           // Hacemos la comprobación para saber que esa comida pertenece al usuario.
           if (x['propietario'] == this.authService.userLog || this.authService.userLog == "jesuselvirasanchez@gmail.com") {
            this.comidaList.push(x as Comida);
           }
           
         })
       });
   }
 
   displayVentanaComida() {
    this.imageService.obtenerReferenciaImagen("IconoComida.png");
    this.imagen = "IconoComida.png";
    // Por defecto tipo de comida.
    this.comidaservice.selectedComida.tipo = "Variada"
    this.comidaservice.selectedComida.imagen = this.imagen;
    this.displayComida = true;
     // Limpar las variables también y cerrar ventana.
     //this.resetForm();
   }
 
   displayVentanaComidaModificar(Comida: Comida) {
     this.imageService.obtenerReferenciaImagen(Comida.imagen);
     this.imagen = Comida.imagen;
     this.comidaservice.selectedComida.imagen = this.imagen;
     this.displayComida = true;
     this.displayComidaModificar = true;
     // Ponemos los datos del Comida en el form.
     this.comidaservice.selectedComida = Comida;
   
   }
 
   closeVentanaComida(ComidaForm: NgForm) {
     this.displayComida = false;
     this.displayComidaModificar = false;
     this.displayMsg = false;
     this.displayMsgAlert = false;
   
     // Limpar las variables también.
     this.resetForm(ComidaForm);
     this.comidaservice.selectedComida = new Comida();
     this.imageService.downloadURL = null;
     this.imageService.uploadProgress = null;
   }
 
   // Elimina al Comida.
   borrarComida() {
     this.comidaservice.borrarComida(this.selectedComidaTable);
   
     // Ponemos el mensaje de Comida Borrado y activamos el flag de la alerta.
     this.msg = "El Comida se ha borrado correctamente."
     this.displayMsg = true;
   }
 
   // Modifica información del Comida.
   modificarComida(Comida: Comida, ComidaForm: NgForm) {
     // Fijamos el Comida que queremos borrar.
     this.selectedComidaTable = Comida;
     // Modificamos los campos.
     this.selectedComidaTable.nombre = ComidaForm.value.nombre;
     this.selectedComidaTable.tipo = ComidaForm.value.tipo;
     this.selectedComidaTable.ingredientes = ComidaForm.value.ingredientes;
     this.selectedComidaTable.descripcion = ComidaForm.value.descripcion;
     this.selectedComidaTable.imagen = this.imagen;
     this.selectedComidaTable.propietario = this.authService.userLog;
 
     console.log(this.selectedComidaTable);
     this.msg = "El Comida ha sido modificado correctamente";
     this.displayMsg = true;
     
     this.comidaservice.actualizarComidaDatabase(this.selectedComidaTable);
 
     this.closeVentanaComida(ComidaForm);
     this.resetForm();
    
   }
   // Busqueda al aplicar el filtro.
   buscarComida() {
     let auxComidas = [];
     // Comprobamos que ningún campo del filtro esté vacio.
     if (this.filtro !== undefined ) {
       if (this.filtro !== "") {
       // Hacemos las consultas desde la lista de Comidas ya obtenidas
       let Comida = this.comidaList.filter( Comida => {
 
         if (Comida.nombre == this.filtro || Comida.tipo == this.filtro) {
           //alert (Comida.email);
           auxComidas.push(Comida);
         }
       });
       this.comidaList = auxComidas;
       } else {
         this.obtenerComidas();
       }
     } else {
       this.obtenerComidas();
     }
   }
 
   // Pasa los datos del Comida a borrar
   onButtonRemove(Comida: Comida) {
     // Fijamos el Comida que queremos borrar.
     this.selectedComidaTable = Comida;
   }
 
   onCloseAlert() {
     this.msg = ""
     this.displayMsg = false;
   }
   // Seleccionar arhivo.
   onFileSelected(event: any) {
     console.log(event);
     this.imageService.selectedImage = event.target.files[0];
     this.imagen = event.target.files[0].name;
     
     // Cargamos la imagen
     this.imageService.cargarImagen(event);
   }

}
