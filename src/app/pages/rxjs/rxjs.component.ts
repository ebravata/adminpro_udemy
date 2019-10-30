import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
   suscripcion: Subscription;

  constructor() {
   this.suscripcion = this.regresaObservable().pipe( retry( 2 ))
                            .subscribe(
                              numero => { console.log('Subs: ', numero ); },
                              error => { console.error('Error en el obs: ', error);},
                              () => { console.log('Observador terminado');}
                              );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('La página se cerró');
    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable <any> {
   return  new Observable ( (observer: Subscriber <any>) => {

    let contador = 0;

    const intervalo = setInterval( () => {

      contador += 1;
      const resultado = {
        valor: contador
      };
      observer.next( resultado );

      // if (contador === 3){
      //   clearInterval(intervalo);
      //   observer.complete();
      // }

      // if (contador === 2){
      //   // clearInterval(intervalo);
      //   observer.error('Ayuda!');
      // }

    }, 1000);
  }).pipe(
      map ( (res: any) => res.valor),
      filter ( (valor, index) => {

        // console.log('filter: ', valor, index);
        if ( (valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
      );
  }

}
