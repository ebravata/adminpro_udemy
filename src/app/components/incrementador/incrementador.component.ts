import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // inputs al componente
  @Input('titulo') leyenda: string = 'leyenda'; // se puede cambiar el nombre del input, desde el cual se asigna el valor en el html
  @Input() porcentaje: number = 50;

  // output del componente
  @Output() actualizaValor: EventEmitter <number> = new EventEmitter();

  // se coloca para crear una referencia y poder accesar a todas las instancias del mismo componente
  @ViewChild('txtProgress',{static: false}) txtProgress: ElementRef;

  constructor() {
    console.log('constructor');
    console.log('leyenda:', this.leyenda);
    console.log('porcentaje:', this.porcentaje);
  }

  ngOnInit() {
    console.log('OnInit');
    console.log('leyenda:', this.leyenda);
    console.log('porcentaje:', this.porcentaje);
  }

  cambiarValor( valor: number ) {

    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0  && valor < 0) {
      this.porcentaje = 0;
      return;
     }

    this.porcentaje = this.porcentaje + valor;
    this.actualizaValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus(); // estable el foco en el input
  }

  siCambia( nuevoValor: number) {
    // se elimina la sig linea de codigo por la implementacion del viewChild
    //  const elementHtml: any = document.getElementsByName('porcentaje')[0]; devuelve un arreglo de elementos que tengan el nombre 'porcentaje'
    // console.log(nuevoValor);
    // console.log(this.txtProgress);
    
    if (nuevoValor >= 100) {
      this.porcentaje = 100;
    } else if (nuevoValor <= 0 || nuevoValor === null) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = nuevoValor;
    }
    
    // se elimina la sig linea de codigo por la implementacion del viewChild
    //  elementHtml.value = this.porcentaje as number;
    this.txtProgress.nativeElement.value = this.porcentaje as number;
    this.actualizaValor.emit(this.porcentaje);
  }
}
