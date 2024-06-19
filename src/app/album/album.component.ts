import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../Services/spotify.service';
import { PreviousRouteService } from '../Services/previous-route.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: any = {};
  tracks: any[] = [];
  loadingAlbum: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
  ) { }

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.getAlbum(albumId);
      this.getAlbumTracks(albumId);
    } else {
      console.error('No se encontró el parámetro "id" en la URL');
      this.loadingAlbum = false;
    }
  }

  getAlbum(id: string) {
    this.spotify.getAlbum(id)
      .subscribe(album => {
        console.log(album);
        this.album = album;
        this.loadingAlbum = false;
      }, error => {
        console.error('Error fetching album:', error);
        this.loadingAlbum = false; 
      });
  }

  getAlbumTracks(id: string) {
    this.spotify.getAlbumTracks(id)
      .subscribe(tracks => {
        console.log(tracks);
        this.tracks = tracks.items;
      }, error => {
        console.error('Error fetching album tracks:', error);
      });
  }  
}
