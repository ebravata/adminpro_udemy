import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  archivoSubir: File;
  imagenTemp: string | ArrayBuffer;
  @ViewChild('inputFile', {static: false}) myInputVariable: ElementRef;


  constructor( private _subirArchivoServ: SubirArchivoService,
               private _modalUploadServ: ModalUploadService
                ) { }

  ngOnInit() {
    console.log('modal activado');
  }

  seleccionaArchivo( archivo: File ){
    console.log( archivo );

    if (!archivo){
      this.archivoSubir = null;
      return;
    }
    
    if (archivo.type.indexOf ('image') < 0){
      Swal.fire('Solo Imagenes','Solo se aceptan imagenes','error');
      this.archivoSubir = null;
      return;
    }

    console.log(archivo.type);
    this.archivoSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
    

  }

  cambiarImagen(){
    
    this._subirArchivoServ.subirArchivo( this.archivoSubir, this._modalUploadServ.tipo, this._modalUploadServ.id )
        .then( resp => {

          // emitimos la respuesta para que los demas componentes esten enterados de los cambios hechos
          this._modalUploadServ.notificacion.emit( resp );
          this.cerrarModal();

        })
        .catch( err => {

          console.log('Error al cargar la imagen');

        });

  }

  cerrarModal(){
    this.archivoSubir = null;
    this.imagenTemp = null;
    this.myInputVariable.nativeElement.value = '';
    this._modalUploadServ.ocultarModal();
  }

}
