import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _documento, ) {
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('userSettings', JSON.stringify( this.ajustes ));
    console.log('ajustes guardados al localStorage');
  }

  cargarAjustes(){

    if (localStorage.getItem('userSettings')){

      this.ajustes = JSON.parse(localStorage.getItem('userSettings'));
      console.log('ajustes cargados del localStorage');
    } else {
      console.log('usando ajustes por defecto');
    }
    this.aplicarTema( this.ajustes.tema );
  }

  aplicarTema( tema: string ){
    const url = `assets/css/colors/${ tema }.css`;
    this._documento.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

  }
}

interface Ajustes {
        temaUrl: string;
        tema: string;
        }
