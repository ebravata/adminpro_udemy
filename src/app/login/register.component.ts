import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { format } from 'url';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function iniciar_plugins(); // se declara la funcion para usar los plugins

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( private usuarioServ: UsuarioService,
               private router: Router) { }

  ngOnInit() {

     iniciar_plugins(); 

     this.forma = new FormGroup({
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
    }, { validators: this.noSonIguales( 'password', 'password2') }); // se pasa como parametro el nombre de los campos
  }

  noSonIguales(campo1: string, campo2: string){
    return (group: FormGroup ) => {
      
        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;
    
    
        if (pass1 === pass2){
          return null; // mandamos un null por que no hay error
        }
    
        return {
          noSonIguales: true // mandamos un error si no coinciden
        }
      }
  }

  registrarUsuario(){

    if (this.forma.invalid){
      return;
    }

    if (!this.forma.value.condiciones){
      Swal.fire('Importante', 'Debe aceptar las condiciones','warning');
      // console.log('Debe aceptar las condiciones');
      return;
    }

    let usuario = new Usuario (
      this.forma.controls.nombre.value,
      this.forma.controls.correo.value,
      this.forma.controls.password.value
    )

    this.usuarioServ.crearUsuario( usuario )
        .subscribe( resp => {
          console.log(resp);
          this.router.navigateByUrl('/login');
          
        })
    
    
    console.log(this.forma.value);
    console.log('Forma valida: ',this.forma.valid);
  }

}
