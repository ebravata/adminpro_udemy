import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/services.index';
// import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(// @Inject(DOCUMENT) private _documento, // movido al settings services para cargar los datos del localStorage
              private _settings: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any){
    this._settings.aplicarTema( tema );
    this.agregarCheck( link );

  }

  agregarCheck( link: any ){
    // codigo de vanilla javascript
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    // codigo de vanilla javascript
    const selectores: any = document.getElementsByClassName('selector');
    const tema= this._settings.ajustes.tema;
    for (const ref of selectores){
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
