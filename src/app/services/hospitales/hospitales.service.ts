import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIDOR } from '../../config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  token: string;

  constructor( private http: HttpClient,
               private _usuarioServ: UsuarioService ) {

                this.token = this._usuarioServ.token;

                }

  cargarHospitales( desde: number) {

    let url = URL_SERVIDOR + '/hospital';
    url += '?desde=' +  desde;

    return this.http.get( url );

  }

  obtenerHospital( id: string ) {
      
    let url = URL_SERVIDOR + '/hospital/' + id;
    
    return this.http.get( url );

  }

  borrarHospital(	id:	string	){

    let url = URL_SERVIDOR + '/hospital/' + id;
    url += '?token=' + this.token;
    
    // console.log(hospital);
    return this.http.delete ( url );

  }
  
  crearHospital(	nombre:	string	){

    let hospital= new Hospital (nombre, '', '') ;

    const url = URL_SERVIDOR + '/hospital?token=' + this.token;
    
    // hospital.nombre= nombre;

    return this.http.post ( url, hospital );

  }

  buscarHospital(	termino:	string ){

      let url = URL_SERVIDOR + '/busqueda/coleccion/hospitales/' + termino;
  
      return this.http.get ( url )
        .pipe( map ( (resp: any) => resp.hospitales ));

  }


  actualizarHospital(	hospital: Hospital	){

    let url = URL_SERVIDOR + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    // console.log(hospital);
    return this.http.put ( url, hospital );

  }

}
