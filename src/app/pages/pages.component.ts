import { Component, OnInit } from '@angular/core';

declare function iniciar_plugins(); // se declara la funcion para usar los plugins

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    iniciar_plugins();// se cargan los plugins de JS
    
  }

}
