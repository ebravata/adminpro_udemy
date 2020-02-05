import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ImagenesPipe } from './imagenes.pipe';




@NgModule({
  declarations: [
    ImagenesPipe
  ],
  imports: [
    // CommonModule este modulo por ahora no se usa (ngIf, ngFor, etc)
    
  ],
  exports: [
    ImagenesPipe
  ]
})
export class PipesModule { }
