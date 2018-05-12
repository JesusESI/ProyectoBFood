import { Component, OnInit } from '@angular/core';
import { Evento } from '../entidades/evento';
import { EventoService } from '../services/evento.service';
import { AuthService } from '../services/auth.service';
import { Beacon } from '../entidades/beacon';
import { Comida } from '../entidades/comida';
import { BeaconService } from '../services/beacon.service';
import { ComidaService } from '../services/comida.service';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-eventos-module',
  templateUrl: './eventos-module.component.html',
  styleUrls: ['./eventos-module.component.scss']
})
export class EventosModuleComponent implements OnInit {

  // Lista donde se cargar los objetos de cada tipo.
  eventoList: Evento[];
  beaconList: Beacon[];
  comidaList: Comida[];

  // Lista de comidas elegidas
  private targetComidasList: Comida[];
  private initialComidaList: Comida[];

  // Objeto para añadir o modificar en firebase.
  eventoForm: Evento = new Evento();

  // DropDownBeacons
  groupedBeacons: SelectItem[] = [];

  // Lista de comidas que se pasará para almacenar.
  private comidasTargetForm: any[] = [];

  // Columnas de la tabla.
  private cols = [
    { field: "nombre", header:"Nombre"},
    { field: "restaurante", header:"Restaurante"},
    { field: "descripcion", header:"Descripción"},
    { field: "tipo", header:"Tipo"},
    { field: "FechaInicio", header:"Desde"},
    { field: "FechaFin", header:"Hasta"} 
  ];
  // Formato de los calendarios.
  private es = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
  };

  //Inicializar variables para el form.
  private nombreForm: string = "";
  private restauranteForm: string = "";
  private tipoForm: string = "Otro";
  private fechaInicioForm: Date = new Date();
  private fechaFinForm: Date = new Date()
  private beaconForm: Beacon;
  private comidasForm: string = "";
  private descripcionForm: string = "";


  // Flags
  private displayEvento: boolean;
  private displayModificarEvento: boolean;
  private displayComidas: boolean;
  private displayMsgAlert: boolean;

  private selectedEventoTable: Evento;
  private msg: string;
  private displayMsg: boolean;
  private filtro: string;


  
  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private beaconservice: BeaconService,
    private comidaservice: ComidaService
  ) { }

  ngOnInit() {
    // Inicialización de flags
    this.displayEvento = false;
    this.displayModificarEvento = false;
    this.displayComidas = false;
    // Obtenemos los ditintos eventos, beacons y comidas
    this.obtenerEventos();
    this.obtenerBeacons();
    this.obtenerComidas();    
  }

  obtenerEventos() {
    this.eventoService.getEventos()
       .snapshotChanges()
       .subscribe(item => {
         this.eventoList = [];
         item.forEach(element => {
           let x = element.payload.toJSON();
           x['$key'] = element.key;
           
           if (x['propietario'] == this.authService.userLog || this.authService.userLog == "jesuselvirasanchez@gmail.com") {
            this.eventoList.push(x as Evento);
           }
         });
       });
  }

  obtenerComidas() {
    this.comidaservice.getComidas()
       .snapshotChanges()
       .subscribe(item => {
         this.comidaList = [];
         item.forEach(element => {
           let x = element.payload.toJSON();
           x['$key'] = element.key;
           
           if (x['propietario'] == this.authService.userLog || this.authService.userLog == "jesuselvirasanchez@gmail.com") {
            this.comidaList.push(x as Comida);
           }
         });
       });
  }

  obtenerBeacons() {
    this.beaconservice.getBeacons()
       .snapshotChanges()
       .subscribe(item => {
         this.beaconList = [];
         item.forEach(element => {
           let x = element.payload.toJSON();
           x['$key'] = element.key;
           
           if (x['propietario'] == this.authService.userLog || this.authService.userLog == "jesuselvirasanchez@gmail.com") {
            this.beaconList.push(x as Beacon);
           }
         });
         // Cargamos el dropdown.
         this.cargarDropDown();
         // console.log(this.groupedBeacons);
       });
  }

  onSubmit() {
    if (this.checkData()) {
      if (this.displayEvento && this.displayModificarEvento) {
        console.log("Modificando Evento...");
        this.modificarEvento();
      } else {
        // Crear Objeto evento.
        this.crearInstanciaEvento();
        console.log("Añadiendo Evento...");
        this.eventoService.añadirEventoDatabase(this.eventoForm);
        //this.comidaservice.añadirComidaDatabase(this.comidaservice.selectedComida, this.authService.userLog, this.imagen);
        this.resetForm();
        this.displayEvento = false;
  
        // Modificamos Flag y mensaje.
        this.msg = "El evento ha sido creado correctamente";
        this.displayMsg = true;
      }
    } else {
      this.msg = "Todos los campos son obligatorios"
      this.displayMsgAlert = true;
    }
  }

  checkData(): boolean {
  
     if ((this.nombreForm && this.restauranteForm && this.tipoForm
       && this.fechaInicioForm && this.fechaFinForm && this.beaconForm && this.descripcionForm) !== undefined 
       && this.targetComidasList.length > 0) {
       if ((this.nombreForm && this.restauranteForm && this.tipoForm
        && this.fechaInicioForm && this.fechaFinForm && this.beaconForm && this.descripcionForm) !== "" ) {
         return true;
       } else {
         return false;
       }
     } else {
       return false;
     } 
   }

   buscarEvento() {
    let auxEventos = [];

    if (this.filtro !== undefined ) {
      if (this.filtro !== "") {
      
      let evento = this.eventoList.filter( evento => {

        if (evento.nombre == this.filtro || evento.restaurante == this.filtro 
          || evento.tipo == this.filtro) {
         
          auxEventos.push(evento);
        }
      });
      this.eventoList = auxEventos;
      } else {
        this.obtenerEventos();
      }
    } else {
      this.obtenerEventos();
    }
  }

   crearInstanciaEvento() {
    this.eventoForm.nombre = this.nombreForm;
    this.eventoForm.descripcion = this.descripcionForm;
    this.eventoForm.restaurante = this.restauranteForm;
    this.eventoForm.tipo = this.tipoForm;
    this.eventoForm.FechaInicio = this.fechaInicioForm;
    this.eventoForm.FechaFin = this.fechaFinForm;
    this.eventoForm.beacon = this.beaconForm;
    this.eventoForm.comidas = this.comidasTargetForm;
    this.eventoForm.propietario = this.authService.userLog;
   }

   modificarEvento() {
  
    // Modificamos los campos.
    this.selectedEventoTable.nombre = this.nombreForm;
    this.selectedEventoTable.restaurante = this.restauranteForm;
    this.selectedEventoTable.descripcion = this.descripcionForm;
    this.selectedEventoTable.tipo = this.tipoForm;
    this.selectedEventoTable.FechaInicio = this.fechaInicioForm;
    this.selectedEventoTable.FechaFin = this.fechaFinForm;
    this.selectedEventoTable.beacon = this.beaconForm;
    this.selectedEventoTable.comidas = this.comidasTargetForm;

    console.log(this.selectedEventoTable);
    this.msg = "El evento ha sido modificado correctamente";
    this.displayMsg = true;
    
    this.eventoService.actualizarEventoDatabase(this.selectedEventoTable);

    this.closeVentanaEvento();
    this.resetForm();
  }

  cargarDropDown() {
    this.groupedBeacons = [];
 
    this.beaconList.forEach(element => { 
      this.groupedBeacons.push({ 
        label: element.nombre, 
        value: {
                id: element.id,
                nombre: element.nombre,
                latitud: element.latitud,
                longitud: element.longitud,
                propietario: element.propietario}});
    });
    if (this.groupedBeacons.length > 0) {
      this.beaconForm = this.groupedBeacons[0].value;
    }
  }

  displayVentanaEvento() {
    this.displayEvento = true;
    this.targetComidasList = [];
  }

  displayVentanaComidas() {
    this.initialComidaList = this.comidaList.slice();
    this.targetComidasList = [];
    this.displayComidas = true;
  }

  displayVentanaEventoModificar(evento: Evento) {
    console.log(evento);
    
    this.selectedEventoTable = evento;
    // Agregamos los datos del evento actual al form.
    this.nombreForm = this.selectedEventoTable.nombre;
    this.restauranteForm = this.selectedEventoTable.restaurante;
    this.descripcionForm = this.selectedEventoTable.descripcion;
    this.tipoForm = this.selectedEventoTable.tipo;
    //this.fechaInicioForm = evento.FechaInicio;
    //this.fechaFinForm = evento.FechaFin;
    this.parsearFechas(String(evento.FechaInicio), String(evento.FechaFin));
    this.beaconForm = this.selectedEventoTable.beacon;
    this.leerComidas();

    this.displayEvento = true;
    this.displayModificarEvento = true;
  }

  parsearFechas(fechaI: string, fechaF: string) {

    this.fechaInicioForm = this.construirFecha(fechaI);
    this.fechaFinForm = this.construirFecha(fechaF)
  }

  construirFecha(fecha: string): Date {

    let arrayFecha = fecha.split('/');
    let arrayTiempo = arrayFecha[2].split('');


    console.log(arrayFecha);
    console.log(arrayTiempo);
    
     let año: string = arrayTiempo[0] + arrayTiempo[1] + arrayTiempo[2] + arrayTiempo[3];
     //console.log(año);
     let mes: string = arrayFecha[1];
     //console.log(mes);
     let dia: string = arrayFecha[0];
     //console.log(dia);
     let hora: string;
     let minutos: string;
     let segundos: string;

     if (arrayTiempo[6] === ":") {
      hora = arrayTiempo[5];
      minutos = arrayTiempo[7] + arrayTiempo[8];
      segundos = arrayTiempo[10] + arrayTiempo[11];
     } else {
      hora = arrayTiempo[5] + arrayTiempo[6];
      minutos = arrayTiempo[8] + arrayTiempo[9];
      segundos = arrayTiempo[11] + arrayTiempo[12];
     }
     //console.log(hora);
     //console.log(minutos);
     //console.log(segundos);
  
    return new Date(Number(año), Number(mes), Number(dia), Number(hora), Number(minutos), Number(segundos));
  }

  onCloseAlert() {
    this.msg = ""
    this.displayMsg = false;
  }

  closeVentanaEvento(){
    // llamar al reset form.
    this.displayEvento = false;
    this.displayModificarEvento = false;

    this.comidasTargetForm = [];

    this.resetForm();
  }

  borrarEvento(){
    this.eventoService.borrarEvento(this.selectedEventoTable);

    this.msg = "El evento se ha borrado correctamente."
    this.displayMsg = true;
  }

  onDeleteEvent(rowData: Evento) {
    this.selectedEventoTable = rowData;
  }

  leerComidas(){
    this.comidasForm = "";
    let aux = this.selectedEventoTable.comidas;

    for (let i: number = 0; i < Object.keys(aux).length; i++) {
      this.comidasForm = this.comidasForm + aux[i].nombre + " - " + aux[i].tipo + "\n";
    }
  }

  aceptarComidas() {
    this.comidasForm = "";

    // Para cada elemento comida añadirlo como texto en el panel.
    this.targetComidasList.forEach(element => {
      this.comidasForm = this.comidasForm + element.nombre + " - " + element.tipo + "\n";
    });
    // Cerramos la ventana de comidas
    this.displayComidas = false;
    // Introducimos los elementos que s ele pasarán a firebase.
    this.pushTargetComidasForm();
    console.log(this.targetComidasList);
    console.log(this.comidasTargetForm);
  }

  pushTargetComidasForm() {
    this.targetComidasList.forEach(element => {
      this.comidasTargetForm.push({
        nombre: element.nombre,
        tipo: element.tipo,
        ingredientes: element.ingredientes,
        descripcion: element.descripcion,
        imagen: element.imagen,
        propietario: element.propietario
      });
    });
  }

  cancelarComidas() {
    this.displayComidas = false;
    this.comidasTargetForm = [];
  }

  cambiarBeaconForm(event: any) {
    console.log(event);
    this.beaconForm = event.value;
  }

  resetForm() {
    this.nombreForm = "";
    this.restauranteForm = "";
    this.tipoForm = "Otro";
    this.fechaInicioForm = new Date();
    this.fechaFinForm = new Date();
    this.beaconForm = null;
    this.comidasForm = "";
    this.descripcionForm = "";
  }  
}
