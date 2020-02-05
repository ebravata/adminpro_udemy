import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVIDOR } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenesPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios') {

    let url = URL_SERVIDOR + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }


    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    
    switch (tipo) {
    case 'usuarios':
      url += '/usuarios/' + img;
      break;

    case 'medicos':
      url += '/medicos/' + img;
      break;

    case 'hospitales':
      url += '/hospitales/' + img;
      break;
  
    default:
      url += '/usuarios/xxx';
      break;
  }
  return url;
}

}