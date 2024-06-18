import { Component } from '@angular/core';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss'],
})
export class SongSearchComponent {

  canciones: any[] = [];
  loading?: boolean;

  constructor(private spotify: SpotifyService) { }
  
  buscar(termino: string) {
    this.loading = true;
    this.spotify.getCanciones(termino)
      .subscribe((data: any) => {
        console.log(data);
        if (data && data.length > 0) {
          // Intenta encontrar la estructura correcta en la respuesta de Spotify
          let items = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            artists: item.artists
          }));
  
          // Si encuentras la estructura correcta, asigna los datos a this.canciones
          this.canciones = items;
        } else {
          console.error('La respuesta de Spotify no contiene la estructura esperada:', data);
          this.canciones = []; // Limpiar canciones en caso de una respuesta inesperada
        }
        this.loading = false;
      }, error => {
        console.error('Error al buscar canciones:', error);
        this.loading = false;
        this.canciones = []; // Limpiar canciones en caso de error
      });
  }

  getEmbedUrl(cancion: any): string {
    // Construir la URL de embebido de Spotify
    return `https://open.spotify.com/embed/track/${cancion.id}`;
  }

}
