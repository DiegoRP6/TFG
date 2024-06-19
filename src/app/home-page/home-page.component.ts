import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../Services/spotify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private spotify: SpotifyService, private router: Router) { }


  redirectToMain(): void {
    this.router.navigate(['/main']);
  }
}
