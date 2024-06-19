import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  activeIcon: string = '';

  constructor(private router: Router) {}

  onHomeClick() {
    this.activeIcon = 'home'
    this.router.navigate(['/home']);
    console.log('Music button clicked');
  }

  onMainClick(){
    this.router.navigate(['/main']);
    console.log('Main button clicked');
  }

  onPlaylistClick() {
    this.router.navigate(['/playlist']);
    console.log('Playlist button clicked');
  }

  onSearchClick() {
    this.router.navigate(['/search']);
    console.log('Search button clicked');
  }

  onSearchAlbumsClick() {
    this.router.navigate(['/search/albums']);
    console.log('Search Albums button clicked');
  }

  onSearchSongsClick() {
    this.router.navigate(['/search/songs']);
    console.log('Search Songs button clicked');
  }
}