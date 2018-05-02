import { Component, OnInit  } from "@angular/core";

// Importar servicio Auth
import { AuthService } from "../services/auth.service";

@Component({})
  export class UserComponent  {

    constructor(public serviceAuth: AuthService){}

    prueba(){
        
    }
  }  