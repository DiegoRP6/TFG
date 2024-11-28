import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string): any {
    // Generar la URL completa con el autoplay activado
    const url = `https://open.spotify.com/embed/track/${value}?autoplay=1`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
