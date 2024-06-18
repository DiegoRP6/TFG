import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {

  @Input() item: any;

  constructor(private router: Router) { }

  verPlaylist(item: any) {
    let playlistId = item.id;
    this.router.navigate(['/playlist', playlistId]);
  }

  
}
