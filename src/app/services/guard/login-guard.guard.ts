import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor (
                private usuarioServ: UsuarioService,
                private router: Router
              ){

  }
  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot estos no se usaran en este ejercicio
    ){

    if (this.usuarioServ.estaLogueado()) {
      
      console.log('pasó por el Guard');
      return true;

    } else {
      console.log('bloqueado por el Guard');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
