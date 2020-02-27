import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../services/medicos/medicos.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros: number;
  desde: number = 0;
  cargando: boolean = true;

  constructor( private _medicosServ: MedicosService) { }

  ngOnInit() {

    this.cargarMedicos();
  }


  cargarMedicos(){

    this._medicosServ.cargarMedicos( this.desde )
        .subscribe( (resp: any ) => {
          
          this.medicos = resp.medicos;
          this.totalRegistros = resp.total;
          this.cargando = false;

        });
  }

  editarMedico( ){

  }

  borrarMedico( medico: Medico ){
 
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Desea elimniar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
         
        this._medicosServ.borrarMedico( medico._id )
            .subscribe ( borrado => {
              
              if ( this.desde >= (this.totalRegistros - 1) ){
              this.cambiarDesde(-5);
              }

              this.cargarMedicos();
              console.log(borrado)
            });
      }
    });
  }

  buscarMedicos( termino: string ){

    if ( termino.length <= 0 ){

      this.cargarMedicos();
      return;

    }
    
    this.cargando = true;
    this._medicosServ.buscarMedicos( termino )
        .subscribe( medicos => {

            this.medicos = medicos;
            this.cargando = false;

        });

  }

  crearMedico(){

  }

  mostrarModal( tipo: string, id: string){

  }

  cambiarDesde( valor: number ) {

    const desde =  this.desde + valor;
    console.log(this.desde);

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();


  }

}
