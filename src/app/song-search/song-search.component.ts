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
    this.spotify.getTracks(termino)
      .subscribe((data: any) => {
        console.log(data);
        if (data && data.length > 0) {
          let items = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            artists: item.artists
          }));
          this.canciones = items;
        } else {
          console.error('La respuesta de Spotify no contiene la estructura esperada:', data);
        }
        this.loading = false;
      }, error => {
        console.error('Error al buscar canciones:', error);
        this.loading = false;
        this.canciones = [];
      });
  }

  getEmbedUrl(cancion: any): string {
    return `https://open.spotify.com/embed/track/${cancion.id}`;
  }

}
