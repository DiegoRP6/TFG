import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../Services/spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {
  artista: any = {};
  topTracks: any = {};
  loadingArtist: boolean = true;
  artists: any[] = [];
  following: boolean = false;
  viewType: 'html' | 'iframe' = 'html';
  safeUrl: SafeResourceUrl = ''; 


  constructor(private router: ActivatedRoute, private spotify: SpotifyService, private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
      this.getRelatedArtists(params['id']);
      this.spotify.isFollowingArtist(params['id']).subscribe(
        (response: boolean[]) => {
          this.following = response[0];
          console.log('¿Se sigue al artista?', this.following);
        },
        (error) => {
          console.error('Error al comprobar si se sigue al artista:', error);
          this.following = false; 
        }
      );
    });
  }

  getArtista(id: string) {
    this.spotify.getArtist(id)
      .subscribe(artista => {
        console.log(artista);
        this.artista = artista;
        this.loadingArtist = false;
        this.setIframeUrl();
      });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe(tracks => {
        console.log(tracks);
        this.topTracks = tracks.slice(0, 5);
      });
  }

  getRelatedArtists(id: string) {
    this.spotify.getRelatedArtists(id)
    .subscribe((data: any) => {
      console.log("Data", data);
      this.artists = data.slice(0, 4);
    });
  }
  
  seguirArtista(id: string) {
    this.spotify.followArtist([id]); // Pasamos el id dentro de un array
    window.location.reload();  // Recargar la página
  }

  unfollowArtist(id: string) {
    this.spotify.unfollowArtist([id]); // Pasamos el id dentro de un array
    window.location.reload();  // Recargar la página después de dejar de seguir al artista
  }

  toggleView(view: 'html' | 'iframe') {
    this.viewType = view;
  }

  setIframeUrl() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/artist/${this.artista.id}?utm_source=generator`);
  }
}
