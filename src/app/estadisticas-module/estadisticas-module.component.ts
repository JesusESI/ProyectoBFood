import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas-module',
  templateUrl: './estadisticas-module.component.html',
  styleUrls: ['./estadisticas-module.component.scss']
})
export class EstadisticasModuleComponent implements OnInit {

  // Datos de las gráficas.
  private dataPie: any;
  private dataCharts: any;

  // Matriz de los diez usuarios más activos.
  private usuarios: any[];

  constructor() { }

  ngOnInit() {
    // TODO: DATOS DE PREUBA (COMPLETAR CUANDO LA APLICACIÓN MÓVIL INTERACTUE CON FIREBASE)
    // 10 usuarios más activos (Prueba).
    this.usuarios = [
      { posicion: "1ª", apodo: "Flurry", eventos: " 78", aceptados: "68", noAceptados: "10"},
      { posicion: "2ª", apodo: "Jaimito", eventos: " 30", aceptados: "15", noAceptados: "15"},
      { posicion: "3ª", apodo: "Juan", eventos: " 47", aceptados: "20", noAceptados: "27"},
      { posicion: "4ª", apodo: "Pablo", eventos: " 90", aceptados: "20", noAceptados: "70"},
      { posicion: "5ª", apodo: "Miguel", eventos: " 25", aceptados: "20", noAceptados: "5"},
      { posicion: "6ª", apodo: "Julian", eventos: " 25", aceptados: "20", noAceptados: "5"},
      { posicion: "7ª", apodo: "Jose", eventos: " 25", aceptados: "20", noAceptados: "5"},
      { posicion: "8ª", apodo: "Manolo", eventos: " 25", aceptados: "20", noAceptados: "5"},
      { posicion: "9ª", apodo: "Ricardo", eventos: " 25", aceptados: "20", noAceptados: "5"},
      { posicion: "10ª", apodo: "Mario", eventos: " 25", aceptados: "20", noAceptados: "5"},
    ];
    
    // Inicializar los datos Pie (ejemplo).
    // this.dataPie = {
    //   labels: ['Usuario1','Usuario2','Usuario3','Usuario4','Usuario5','Usuario6',
    //   'Usuario7','Usuario8','Usuario9','Usuario10'],
    //   datasets: [
    //       {
    //           data: [25, 10, 65],
    //           backgroundColor: [
    //               "#FF6384",
    //               "#36A2EB",
    //               "#FFCE56"
    //           ],
    //           hoverBackgroundColor: [
    //               "#FF6384",
    //               "#36A2EB",
    //               "#FFCE56"
    //           ]
    //       }]    
    //   };

    this.construirPie();


    // Iniclizar datos barra.
    this.dataCharts = {
      labels: ['Evento1', 'Evento2', 'Evento3', 'Evento4', 'Evento5', 'Evento6', 'Evento7', 'Evento8', 'Evento9', 'Evento10'],
      datasets: [
          {
              label: 'Aceptados',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40, 35, 85, 75]
          },
          {
              label: 'No aceptados',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 40, 27, 25, 45, 29, 14 ]
          }
      ]
    }
  }

  construirPie () {
    let labels: any[] = [];
    let data: any[] = [];
    // Inicialización de las partes.
    this.dataPie = { 
      labels: [], 
      datasets: [ 
      {
        data: [],
        backgroundColor: [
          "#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C", "#F1C40F", "#D35400", "#BDC3C7", "#34495E", "#16A085", "#E67E22"
        ],
        hoverBackgroundColor: [
          "#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C", "#F1C40F", "#D35400 ", "#BDC3C7", "#34495E", "#16A085", "#E67E22"
        ]
      }]    
    };
    // Añadimos los datos de los usuarios a la gráfica
    this.usuarios.forEach(element => {
      labels.push(element.apodo);
      data.push(element.eventos);
    });
    // Añdimos los datos a la matriz.
    this.dataPie['labels'] = labels;
    this.dataPie['datasets'][0]['data'] = data;

    console.log(this.dataPie);
  }

  update(event: Event) {
   
  } 
}

