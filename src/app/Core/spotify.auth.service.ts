import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private spotifyAuthUrl = 'https://accounts.spotify.com/api/token';
  private clientId = 'd71ba7ba504e4be9a3dee860ce483d77';
  private clientSecret = 'c372783099b14445a21a5e1bdf9d0747';

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post(this.spotifyAuthUrl, body.toString(), { headers });
  }

getTopTracks(): Observable<any> {
  // Obtén el token antes de enviar la solicitud
  return this.getToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Utiliza el token obtenido para la autorización
      });
      // Continuar con la solicitud usando el token en el encabezado de autorización
      return this.http.get('https://api.spotify.com/v1/me/albums/contains', { headers });
    })
  );
}
}