import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent implements OnInit {
  playlists: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  playlistData = {
    name: '',
    description: '',
    public: false
  };

  constructor(
    private spotifyService: SpotifyService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getUserPlaylists();
  }

  getUserPlaylists() {
    this.spotifyService.getUserPlaylists().subscribe(
      (data: any) => {
        this.playlists = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching playlists', error);
        this.error = true;
        this.loading = false;
      }
    );
  }

  openCreatePlaylistModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  crearPlaylist(modal: any) {
    this.spotifyService.createPlaylist(this.playlistData.name, this.playlistData.description, this.playlistData.public)
      .subscribe(
        (response) => {
          console.log('Playlist creada:', response);
          modal.close();
          this.getUserPlaylists(); 
          this.playlistData.name = ''; 
          this.playlistData.description = ''; 
          this.playlistData.public = false; 
          this.error = false; 
        },
        (error) => {
          console.error('Error al crear la playlist:', error);
          this.error = true;
        }
      );
  }

  
}
