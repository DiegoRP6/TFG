import { Component } from '@angular/core';
import { SpotifyService } from '../Core/spotify.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  imports: [ToolbarComponent],
  standalone: true
})
export class SearchPageComponent {
  artistas: any[] = [];
  loading?: boolean;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    this.loading = true;
    this.spotify.getArtistas(termino)
      .subscribe((data: any) => {
        console.log(data);
        this.artistas = data;
        this.loading = false;
      });
  }
}
