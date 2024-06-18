import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  activeIcon: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  onHomeClick() {
    this.activeIcon = 'home'
    this.router.navigate(['/home']);
    console.log('Music button clicked');
  }

  onMainClick(){
    this.router.navigate(['/main']);
    console.log('Main button clicked');
  }

  onSearchClick() {
    this.router.navigate(['/search']);
    console.log('Search button clicked');
  }

  onSearchArtistsClick() {
    this.router.navigate(['/search/artists']);
    console.log('Search Artists button clicked');
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