import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SpotifyAuthService } from './spotify.auth.service'; 

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {
  constructor(private spotifyAuthService: SpotifyAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtener el token de Spotify antes de enviar la solicitud
    return this.spotifyAuthService.getToken().pipe(
      switchMap((response: any) => {
        // Si se obtiene el token correctamente, agregarlo al encabezado de autorización
        if (response && response.access_token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access_token}`
            }
          });
        }
        // Continuar con la solicitud modificada
        return next.handle(req);
      })
    );
  }
}
