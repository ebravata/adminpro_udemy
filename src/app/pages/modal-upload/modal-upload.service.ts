import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  tipo: string;
  id: string;
  oculto: string = 'oculto'; // el valor 'oculto' es el nombre del estilo en el style.css
  notificacion: EventEmitter <any> = new EventEmitter(); // para emitir la notificacion a los demas componentes que se suscriban
  
  constructor() { 
    console.log('modal service listo');
  }

  mostralModal( tipo: string, id: string){
    this.tipo = tipo;
    this.id = id;
    this.oculto = '';
  }

  ocultarModal(){
    this.tipo = '';
    this.id = '';
    this.oculto = 'oculto';
  }
}
