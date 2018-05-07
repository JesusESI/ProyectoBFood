import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';


// Para cargar imagenes.
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';


@Injectable()
export class ImageService {

  // Referencias y tareas de subida.
  ref: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  //Imagen seleccuionada y url de la imagen cargada.
  selectedImage = null;
  

  // datos de la subida.
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  // Datos pasados a primitivos.
  state: string;
  progress: number;
  url: string;
  

  constructor(private storage: AngularFireStorage) { }

   cargarImagen(event: any) {
    // Obtener referencia de la ruta donde queremos guardar la imagen.
     this.ref = this.storage.ref('Imagenes');
     this.uploadTask = this.ref.child(`${event.target.files[0].name}`).put(this.selectedImage);

    this.uploadState = this.uploadTask.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.uploadTask.percentageChanges();
    this.downloadURL = this.uploadTask.downloadURL();
  
    console.log(this.state);
    console.log(this.progress);
    console.log(this.url);
    }

    obtenerReferenciaImagen(imagen: string) {
      this.ref = this.storage.ref('Imagenes/'+ imagen);
      this.downloadURL = this.ref.getDownloadURL();
    }
}
