import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
       { titulo: 'Dasboard', url: '/dashboard'},
       { titulo: 'ProgressBar', url: '/progress'},
       { titulo: 'Gráficas', url: '/graficas1'},
       { titulo: 'Promesas', url: '/promesas'},
       { titulo: 'Rxjs Componente', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
       { titulo: 'Usuarios', url: '/usuarios'},
       { titulo: 'Médicos', url: '/medicos'},
       { titulo: 'Hospitales', url: '/hospitales'}
      ]
    }
  ]

  constructor() { }
}