import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIDOR } from '../../config/config';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

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

      } else {
        this.token = '';
        this.usuario = null
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
          })
      );

  }

  actualizarUsuario( usuario: Usuario ){

    let url = URL_SERVIDOR + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    // console.log(url);
    return this.http.put( url, usuario)
      .pipe( map ( (resp: any) =>{

        Swal.fire('Aviso', 'El usuario se actualizó correctamente','success'); 
        this.guardarStorage( resp.usuario._id, this.token, resp.usuario );

        return true;

      }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ){
    
    let url = URL_SERVIDOR + '/login/google';

    return this.http.post( url, { token })
    .pipe(map( (resp: any) => {

          this. guardarStorage(resp.id, resp.token, resp.usuario);
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
      .pipe(map( (resp: any) => {
          
          this. guardarStorage(resp.id, resp.token, resp.usuario);
          return true;

          })
      );

  }

  logout(){

    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigateByUrl('/login');
  }

  actualizarImagen( archivo: File, id: string){

    this._subirArcserv.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) =>{
        // console.log(resp);

        this.usuario.img = resp.usuario.img;
        Swal.fire ('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario );

      })
      .catch( resp => {
        console.log(resp);
      })
  }
}
