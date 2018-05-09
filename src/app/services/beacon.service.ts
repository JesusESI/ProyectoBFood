import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Beacon } from '../entidades/beacon';

@Injectable()
export class BeaconService {

   beaconList: AngularFireList<any>;
   selectedBeacon: Beacon = new Beacon();
   
   constructor(
     private firebase: AngularFireDatabase
   ) { }
 
   getBeacons() {
     return this.beaconList = this.firebase.list('Beacons');
   }
 
   añadirBeaconDatabase(beacon: Beacon, propietario: string) {
     this.beaconList.push({
       id: beacon.id,
       nombre: beacon.nombre,
       latitud: beacon.latitud,
       longitud: beacon.longitud,
       propietario: propietario
     });
   }
 
   actualizarBeaconDatabase(beacon: Beacon) {
     this.beaconList.update(beacon.$key, {
      id: beacon.id,
      nombre: beacon.nombre,
      latitud: beacon.latitud,
      longitud: beacon.longitud,
      propietario: beacon.propietario
     });
   }
 
   borrarBeacon(beacon: Beacon) {
     this.beaconList.remove(beacon.$key);
   }

}
