import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  menus: any[] = [];

  constructor( private _sidebarServ: SidebarService,
               private usuarioServ: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioServ.usuario;
    this.menus = this.usuarioServ.menu;
  }

}
