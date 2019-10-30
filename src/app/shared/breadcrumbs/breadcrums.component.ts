import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo: string;


  constructor(private route: Router,
              private title: Title,
              private meta: Meta ) {
    this.getData().subscribe( data => {
                                      this.titulo = data.titulo;
                                      this.title.setTitle('Adminpro - '+ this.titulo);

                                      const metaTag: MetaDefinition = {
                                        name: 'Descripcion',
                                        content: this.titulo
                                      }

                                      this.meta.updateTag( metaTag );
                                      console.log(data)
                                    });

    

    
   }

  ngOnInit() {
  }

  getData(){
    return this.route.events.pipe( 
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd ) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data)
      );

  }
}
