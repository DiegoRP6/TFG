import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SpotifyAuthService } from '../Core/spotify.auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  imports: [ToolbarComponent, HttpClientModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  standalone: true,
  providers: [SpotifyAuthService]
})
export class SearchPageComponent implements OnInit {

  constructor(private spotifyAuthService: SpotifyAuthService) { }

  ngOnInit(): void {
    // Obtener el token de autorización
    console.log('Obteniendo token de autorización...');
    this.spotifyAuthService.getToken().subscribe(
      (tokenResponse) => {
        console.log('Token de autorización obtenido:', tokenResponse);

        // Ahora que tenemos el token, podemos solicitar las canciones principales
        console.log('Obteniendo las canciones principales...');
        this.spotifyAuthService.getTopTracks().subscribe(
          (tracksResponse) => {
            console.log('Canciones principales obtenidas:', tracksResponse);
          },
          (tracksError) => {
            console.error('Error al obtener las canciones principales:', tracksError);
          }
        );
      },
      (tokenError) => {
        console.error('Error al obtener el token de autorización:', tokenError);
      }
    );
  }
}