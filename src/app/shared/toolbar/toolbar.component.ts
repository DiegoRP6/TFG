import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  activeButton: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.setActiveButton();
    });
  }

  setActiveButton() {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.activeButton = 'home';
    } else if (currentRoute === '/main') {
      this.activeButton = 'main';
    } else if (currentRoute === '/playlist') {
      this.activeButton = 'playlist';
    } else if (currentRoute === '/search') {
      this.activeButton = 'search';
    } else if (currentRoute === '/search/albums') {
      this.activeButton = 'searchAlbums';
    } else if (currentRoute === '/search/songs') {
      this.activeButton = 'searchSongs';
    } else if (currentRoute === '/guessGame') {
      this.activeButton = 'guessGame';
    }
  }


  onButtonClick(button: string, route: string) {
    this.activeButton = button;
    this.router.navigate([route]);
  }
}