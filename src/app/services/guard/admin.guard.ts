import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioServ: UsuarioService ){

  }
  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  ){

    if (this.usuarioServ.usuario.role === 'ADMIN_ROLE'){
      
      return true;

    } else {

      console.log('Bloqueado por el Admin Guard');
      this.usuarioServ.logout();
      return false;

    }
  }
  
}
