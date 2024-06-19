import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlist: any = {};
  loadingPlaylist?: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) { 
    this.router.params.subscribe(params => {
      this.loadingPlaylist = true;
      this.getPlaylist(params["id"]);
    });
  }

  getPlaylist(id: string) {
    this.spotify.getPlaylist(id)
      .subscribe(playlist => {
        this.playlist = playlist;
        this.loadingPlaylist = false;
      });
  }

  deleteTrackFromPlaylist(trackId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta canción de la playlist?')) {
      this.spotify.deleteTrackFromPlaylist(this.playlist.id, trackId)
        .subscribe(() => {
          alert('Canción eliminada de la playlist correctamente.');
          this.getPlaylist(this.playlist.id);
        }, error => {
          console.error('Error al eliminar la canción de la playlist:', error);
          alert('Error al eliminar la canción de la playlist. Inténtalo de nuevo más tarde.');
        });
    }
  }
}
