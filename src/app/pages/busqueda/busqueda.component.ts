import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVIDOR } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitales: Hospital[] = [];

  constructor( private http: HttpClient,
               private router: ActivatedRoute ) {


    this.router.params.subscribe( (misparams) => {

      const termino = misparams.termino;

      const url = URL_SERVIDOR + '/busqueda/todo/' + termino;

      this.http.get( url )
          .subscribe( (resp: any) => {

            this.hospitales = resp.hospitales;
            this.usuarios = resp.usuarios;
            this.medicos = resp.medicos;
            console.log(resp)

          });
    });

   }

  ngOnInit() {
  }

}
