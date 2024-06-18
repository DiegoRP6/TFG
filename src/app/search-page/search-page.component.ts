import { Component } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {

  artistas: any[] = [];
  loading?: boolean;

  constructor(private spotify: SpotifyService) { }
  buscar(termino:string){
    this.loading = true;
    this.spotify.getArtists(termino)
      .subscribe((data: any) => {
        console.log(data)
        this.artistas = data
        this.loading = false
      })
  };
  
}
