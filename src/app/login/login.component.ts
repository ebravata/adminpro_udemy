import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function iniciar_plugins(); // se declara la funcion para usar los plugins

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    iniciar_plugins(); // se cargan los plugins de JS
    
  }
 
  ingresar(){
    this.router.navigate(['/dashboard']);
  }
}
