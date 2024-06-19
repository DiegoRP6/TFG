import { Component } from '@angular/core';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.scss'],
})
export class AlbumSearchComponent {

  albums: any[] = [];
  loading?: boolean;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    this.loading = true;
    this.spotify.getAlbums(termino)
      .subscribe((data: any[]) => { 
        console.log(data);
        this.albums = data; 
        this.loading = false;
      }, error => {
        console.error('Error al buscar álbumes:', error);
        this.loading = false;
      });
  }
  
}
