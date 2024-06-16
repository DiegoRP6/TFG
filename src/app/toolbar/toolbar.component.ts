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

  constructor(private router: Router) {}

  ngOnInit() {}

  onMusicClick() {
    this.router.navigate(['/home']);
    console.log('Music button clicked');
  }

  onSearchClick() {
    this.router.navigate(['/search']);
    console.log('Search button clicked');
  }

  onMailClick() {
    this.router.navigate(['/contact']);
    console.log('Mail button clicked');
  }
}