import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/services.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  totalRegistros: number;
  desde: number = 0;

  constructor( private _hospitalServ: HospitalesService,
               private _modalUploadServ: ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadServ.notificacion.subscribe( resp => {
        
        this.cargarHospitales();

    });
  }

  cargarHospitales(){

    this.cargando = true;

    this._hospitalServ.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {

        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total;
        this.cargando = false;
        console.log(resp);

      });
  }

  guardarHospital( hospital: Hospital ){

    this._hospitalServ.actualizarHospital( hospital )
        .subscribe( (resp: any) => {
          
          // if (resp.ok)
          // {
            Swal.fire('Hospital actualizado', hospital.nombre , 'success');
          // }
          
          })

  }

  borrarHospital( hospital: Hospital ){

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Desea elimniar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {

        this._hospitalServ.borrarHospital( hospital._id )
            .subscribe ( borrado => {

              if ( this.desde >= (this.totalRegistros - 1) ){
              this.cambiarDesde(-5);
              }

              this.cargarHospitales();
              console.log(borrado)
            });
      }
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
    this.cargarHospitales();


  }

  mostrarModal( tipo: string, id: string){

    this._modalUploadServ.mostralModal( tipo, id);

  }

  buscarHospitales(termino: string){

    if ( termino.length <= 0 ){

      this.cargarHospitales();
      return;

    }

    this.cargando = true;
    
    this._hospitalServ.buscarHospital( termino )
        .subscribe( (hospitales: Hospital[]) => {
        
          this.hospitales = hospitales;
          this.cargando = false;

        });
    }

    async crearHospital(){

      // const ipAPI = '//api.ipify.org?format=json'

      // const inputValue = fetch(ipAPI)
      //   .then(response => response.json())
      //   .then(data => data.ip)
      
      const { value: string } = await Swal.fire({
        title: 'Ingrese el nombre del Hospital',
        input: 'text',
        // inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Debe escribir un nombre válido!';
          }


          this._hospitalServ.crearHospital( value )
          .subscribe( (resp: any ) => {
            
            console.log(resp)
          
            if (resp.ok) {
              Swal.fire('Hospital Creado','Es registro ser realizó correctamente','success');
              this.cargarHospitales();
            }

          });
        }
      })
      
      


      
    }

}
