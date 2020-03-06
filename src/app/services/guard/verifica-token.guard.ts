import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( private _usuarioServ: UsuarioService,
               private router: Router){

  }
  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> | boolean {

    console.log('Verifica Token Guard');

    const token = this._usuarioServ.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));
    // console.log(payload);

    const expirado = this.expirado( payload.exp );

    if (expirado) {

      this.router.navigate(['/login']);
      return false;

    }

    return this.verificaRenueva( payload.exp );

  }

  verificaRenueva( fechaexp: number): Promise <boolean> {

    return new Promise ( (resolve, reject) => {

      const tokenExp = new Date ( fechaexp * 1000 );
      const ahora =  new Date();

      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ) {

        resolve( true );

      } else {

        this._usuarioServ.renovarToken()
            .subscribe( () => {

              resolve( true );

            },
            () => {

              reject( false );

            });
      }

    });

  }

  expirado( fechaexpira: number  ) {

      const ahora = new Date().getTime() / 1000;

      if (fechaexpira < ahora) {
        return true;
      } else {
        return false;
    }
  }
}
