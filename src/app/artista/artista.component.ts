import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../Services/spotify.service';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any = {};
  loadingArtist?: boolean;

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) { 
    this.router.params.subscribe( params => {
      this.loadingArtist = true;
      this.getArtista( params["id"])
      this.getTopTracks( params["id"])
    })

  }

  getArtista( id: string ) {
    this.spotify.getArtist(id)
      .subscribe(artista => {
        console.log(artista)
        this.artista = artista
        this.loadingArtist = false;
      })
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id) 
      .subscribe(tracks => {
        console.log(tracks)
        this.topTracks = tracks
      })
  }
}
