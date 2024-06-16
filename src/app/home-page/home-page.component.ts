import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../Core/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private spotify: SpotifyService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectToMain(): void {
    this.router.navigate(['/main']);
  }
}
