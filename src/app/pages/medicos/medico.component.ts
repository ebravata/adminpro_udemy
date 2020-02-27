import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../services/medicos/medicos.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '', '');

  constructor( private _hospitalServ: HospitalesService,
               private _medicoServ: MedicosService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private _modalUploadServ: ModalUploadService
               ) { 

                 activatedRoute.params.subscribe( misparams => {
                   let id = misparams['id'];

                   if (id !== 'nuevo') {

                      this.obtenerMedico( id );

                   }

                 });
               }

  ngOnInit() {

    // this.

    this._hospitalServ.cargarHospitales( 0 )
        .subscribe( (resp: any) => {

            this.hospitales = resp.hospitales;

        });

    this._modalUploadServ.notificacion
        .subscribe( resp => {

            this.medico.img = resp.medico.img;

        });

  }

  guardarMedico( forma: NgForm ) {


    this._medicoServ.guardarMedico( this.medico )
        .subscribe( (resp: any ) => {
          
          if (resp.ok){

            this.medico = resp.medico;
            this.router.navigate(['/medico', this.medico._id ]);
            
          }
        });
  }

  cambiarHospital( id: string) {

    this._hospitalServ.obtenerHospital( id )
        .subscribe( ( resp: any ) =>{
          
          this.hospital = resp.hospital;
          console.log( this.hospital.img );

        });

  }

  obtenerMedico( id ) {

    this._medicoServ.obtenerMedico( id )
        .subscribe( (resp: any) => {

          this.medico = resp.medico;
          this.medico.hospital = resp.medico.hospital._id;

          this.cambiarHospital( this.medico.hospital )

        });
  }

  mostralModal(){

    this._modalUploadServ.mostralModal('medicos', this.medico._id);
  }

}
