import { Component, OnInit } from '@angular/core';


declare function iniciar_plugins(); // se declara la funcion para usar los plugins


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // iniciar_plugins();
  }

}
