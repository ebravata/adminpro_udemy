import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIDOR } from '../../config/config';

import { map, catchError  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( 
              private http: HttpClient,
              private router: Router,
              private _subirArcserv: SubirArchivoService
              ) {
  
      this.cargarStorage();
   
  }

  cargarStorage(){
    
    if (localStorage.getItem('token')) {

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

      } else {
        this.token = '';
        this.usuario = null;
        this.menu = [];
      }
  }

  estaLogueado(){
  
    return  (this.token.length > 5) ? true : false;

  }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVIDOR + '/usuario';

    return this.http.post( url, usuario)
      .pipe(map( (resp: any) => {

        // si la 'resp' fuera un error nos mandaria un 'catch' por lo que no entraria aqui
          Swal.fire('Aviso','El usuario se creó correctamente','success'); 
          return resp.usuario;
          }),

          catchError( err => {

            // console.log(err.error.errors.message);
            Swal.fire (err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err.error.message);

          })
      )
  }

  actualizarUsuario( usuario: Usuario ){

    let url = URL_SERVIDOR + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    // console.log(url);
    return this.http.put( url, usuario)
      .pipe( map ( (resp: any) =>{

        if ( usuario._id === this.usuario._id ){

          this.guardarStorage( resp.usuario._id, this.token, resp.usuario, resp.menu );

        }

        Swal.fire('Aviso', 'El usuario se actualizó correctamente','success'); 
        return true;

      }),

      catchError( err => {

        // console.log(err.error.errors.message);
        Swal.fire (err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err.error.message);

      }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle( token: string ){
    
    let url = URL_SERVIDOR + '/login/google';

    return this.http.post( url, { token })
    .pipe(map( (resp: any) => {

          this. guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          console.log(resp);
          return true;

          })
        );
  }
  
  login ( usuario: Usuario, recordar: boolean) {
    
    if (recordar){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVIDOR + '/login';

    return this.http.post( url, usuario)
      .pipe(  

          map( (resp: any) => {
          
          this. guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          console.log(resp);
          return true;

          }),

          catchError( err => {
            
            console.log(err);
            Swal.fire ('Error en el Login', err.error.message, 'error');
            return throwError(err.error.message);

          }))
  }

  logout(){

    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');
  }

  actualizarImagen( archivo: File, tipo: string, id: string){

    this._subirArcserv.subirArchivo(archivo, tipo, id)
      .then( (resp: any) => {

        this.usuario.img = resp.usuario.img;
        Swal.fire ('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario, resp.menu );

      })
      .catch( err => {

        console.log(err);
        Swal.fire('Error al subir la imagen', err , 'error');

      })
  }

  cargarUsuarios(desde: number ){

    let url = URL_SERVIDOR + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuarios( termino: string){

    let url = URL_SERVIDOR + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get ( url )
      .pipe( map ( (resp: any) =>  resp.usuarios ),

      catchError( err => {

        console.log(err.error.errors.message);
        Swal.fire (err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err.error.message);

      }));
  }

  borrarUsuario( id: string ){

    let url = URL_SERVIDOR + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
          .pipe( map( resp => {
            
            Swal.fire(
              'Eliminado!',
              'Usuario Eliminado',
              'success'
            );

            console.log(resp);
            return true;

          }),

          catchError( err => {

            // console.log(err.error.errors.message);
            Swal.fire (err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err.error.message);

          }));
  }

  renovarToken(){

    let url = URL_SERVIDOR + '/login/renuevatoken';
    url += '?token=' + this.token;
  
    return this.http.get( url )
        .pipe( map( ( resp: any ) => {

          this.token = resp.token;
          localStorage.setItem('token', this.token); // lo ideal es llamar la funcion guardarStorage();
          console.log('Token Renovado');
          return true;

        }),

        catchError( err => {

          // console.log(err.error.errors.message);
          this.router.navigate(['/login']);
          Swal.fire ('Erro al renovar token', 'No fue posible renovar token', 'error');
          return throwError(err.error.message);

        }));
  }
}
