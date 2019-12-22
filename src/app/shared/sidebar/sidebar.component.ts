import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private _sidebarServ: SidebarService,
               private usuarioServ: UsuarioService) { }

  ngOnInit() {
  }

}
