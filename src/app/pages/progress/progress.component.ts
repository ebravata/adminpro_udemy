import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje1: number = 100;
  porcentaje2: number = 90;

  constructor() { }

  ngOnInit() {
  }
  
  // Esta funcion se movió  para el componente "incrementador", para hacerlo reutilizable
  // cambiarValor( valor: number ) {

  //   if (this.porcentaje >= 100 && valor > 0) { 
  //     this.porcentaje = 100; 
  //     return; 
  //   }
  //   if (this.porcentaje <= 0  && valor < 0) { 
  //     this.porcentaje = 0;
  //     return;
  //    }

  //   this.porcentaje = this.porcentaje + valor;
  // }

  actualiza( event: any ){
    this.porcentaje2 = event;
    return;
  }

}
