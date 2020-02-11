import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;
  archivoSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( private usuarioServ: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioServ.usuario;
  }

  actualizarUsuario( usuario: Usuario){

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google){
      
      this.usuario.email = usuario.email;
    }

    // console.log(usuario);

    this.usuarioServ.actualizarUsuario( this.usuario )
        .subscribe( resp => {
          console.log(resp);
        })
  }

  seleccionaArchivo( archivo: File ){
    console.log( archivo );

    if (!archivo){
      this.archivoSubir = null;
      return;
    }
    
    if (archivo.type.indexOf ('image') < 0){
      Swal.fire('Solo Imagenes', 'Solo se aceptan imagenes', 'error');
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

    this.usuarioServ.actualizarImagen(this.archivoSubir, 'usuarios', this.usuario._id);


  }

}
