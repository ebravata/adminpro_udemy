import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function iniciar_plugins(); // se declara la funcion para usar los plugins

declare const gapi: any; // para poder usar la libreria 'gapi' de Google Signin

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(private router: Router,
              private usuarioServ: UsuarioService) { }

  ngOnInit() {

    iniciar_plugins(); // se cargan los plugins de JS
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length>1){
      this.recuerdame = true;
      console.log(this.email.length);
    }

  }

  googleInit(){
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '487090499442-3f7rkig3uo62l5jdia41ubhkd231iunr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile'
        });

        this.attachSignin(document.getElementById('buttonGoogle'));
    });

  }

  attachSignin( element ){
      this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
        
        // let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log( token );

        this.usuarioServ.loginGoogle( token )
            .subscribe( () => { 
              
              // Se agrega esta redireccion semi manual por que no cargaba bien el dashboard (Vanilla JS)
              window.location.href = '#/dashboard';
              
              // this.router.navigate(['/dashboard']); Esta queda fuera...

            });
      });
  }

  ingresar( forma: NgForm) {
    
    const usuario = new Usuario(
      null,
      forma.controls.email.value,
      forma.controls.password.value
      );
      
    this.usuarioServ.login( usuario, forma.controls.recuerdame.value )
      .subscribe( ok => this.router.navigate(['/dashboard']) );

  }
}
