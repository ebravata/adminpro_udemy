import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( private usuarioServ: UsuarioService,
               private router: Router) { 
  }
  
  ngOnInit() {
    this.usuario = this.usuarioServ.usuario;
  }

  irAbusqueda( termino: string){
  
    this.router.navigate(['/busqueda', termino]);

  }

}
