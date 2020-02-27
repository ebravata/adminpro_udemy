import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIDOR } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  token: string;

  constructor( private http: HttpClient,
               private _usuarioServ: UsuarioService ) {

                this.token = this._usuarioServ.token;

                }

  cargarMedicos( desde: number){

    let url = URL_SERVIDOR + '/medico';
    url += '?desde=' + desde;

    return this.http.get( url );
  }

  buscarMedicos( termino: string){

    let url = URL_SERVIDOR + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get ( url )
      .pipe( map ( (resp: any) => resp.medicos ));
  }

  
  borrarMedico( id: string ){

    let url = URL_SERVIDOR + '/medico/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
          .pipe( map( resp => {
            
            Swal.fire(
              'Eliminado!',
              'Médico Eliminado',
              'success'
            );

            console.log(resp);
            return true;

          }));
  }

  guardarMedico( medico: Medico ){

    let url = URL_SERVIDOR + '/medico';

    if (medico._id) {

      url += '/' + medico._id;
      url += '?token=' + this.token;
      Swal.fire( 'Médico Actualizado', medico.nombre, 'success' );
      return this.http.put( url, medico );

    } else {

      url += '?token=' + this.token;
      Swal.fire( 'Médico Creado', medico.nombre, 'success' );
      return this.http.post( url, medico );

    }
  }

  obtenerMedico( id: string ){

    let url = URL_SERVIDOR + '/medico/' + id;
    
    return this.http.get( url );
  
    
  }
}
