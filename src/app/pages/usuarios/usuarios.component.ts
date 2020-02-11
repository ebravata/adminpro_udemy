import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( private _usuServ: UsuarioService,
               private _modalUploadServ : ModalUploadService,
               ) { }

  ngOnInit() {

      this._modalUploadServ.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    
    });

    this.cargarUsuarios();
  }

  cargarUsuarios() {

  this.cargando = true;

  this._usuServ.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {

          this.usuarios = resp.usuarios;
          this.totalRegistros = resp.total;
          
          this.cargando = false;

        });
  }

  cambiarDesde( valor: number ) {

    const desde =  this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    // console.log(this.desde);
    this.cargarUsuarios();


  }

  buscarUsuarios( termino: string ){
    // console.log( termino );
    if ( termino.length <= 0 ){

      this.cargarUsuarios();
      return;

    }
    
    this.cargando = true;
    this._usuServ.buscarUsuarios( termino )
    .subscribe( (usuarios: Usuario[] ) => {
      
        this.usuarios = usuarios;
        this.cargando = false;

        });

  }

  borrarUsuario( usuario: Usuario ){
    
    if (usuario._id === this._usuServ.usuario._id){
      Swal.fire ('Accion no permitida', 'No se puede eliminar a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Desea elimniar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
         
        this._usuServ.borrarUsuario( usuario._id )
            .subscribe ( borrado => {
              
              if ( this.desde >= (this.totalRegistros - 1) ){
              this.cambiarDesde(-5);
              }

              this.cargarUsuarios();
              console.log(borrado)
            });
      }
    })
  }

  guardarUsuario( usuario: Usuario ){

    this._usuServ.actualizarUsuario( usuario )
        .subscribe( resp => console.log(resp));
  }

  mostrarModal( tipo: string, id: string){

    this._modalUploadServ.mostralModal( tipo, id);

  }

}
