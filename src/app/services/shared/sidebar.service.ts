import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //      { titulo: 'Dasboard', url: '/dashboard'},
  //      { titulo: 'ProgressBar', url: '/progress'},
  //      { titulo: 'Gráficas', url: '/graficas1'},
  //      { titulo: 'Promesas', url: '/promesas'},
  //      { titulo: 'Rxjs Componente', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //      { titulo: 'Usuarios', url: '/usuarios'},
  //      { titulo: 'Médicos', url: '/medicos'},
  //      { titulo: 'Hospitales', url: '/hospitales'}
  //     ]
  //   }
  // ]

  menu: any[] = [];

  constructor( public _usuariosServ: UsuarioService) {

    this.menu = this._usuariosServ.menu;

    console.log(this.menu);

   }
}
