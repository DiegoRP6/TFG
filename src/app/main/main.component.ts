import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SpotifyService } from '../Core/spotify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {
  // paises: any[] = [];
  nuevaMusica: any[] = [];
  nuevaPlaylists: any[] = [];
  loading: boolean;

  error: boolean = false;
  mensajeError?: string;
  mensajeErrorPlaylist?: string;


  constructor(private spotify: SpotifyService) { 

    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe((data: any) => {
        this.nuevaMusica = data
        this.loading = false;
      }, (errorServicio)=> {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
        console.log(errorServicio);
      });

    this.spotify.getFeaturedPlaylists()
    .subscribe((data: any) => {
      this.nuevaPlaylists = data
      console.log(data)
      this.loading = false;
    }, (errorServicio)=> {
      this.loading = false;
      this.error = true;
      this.mensajeErrorPlaylist = errorServicio.error.error.message;
      console.log(errorServicio);
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
