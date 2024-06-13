import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SpotifyService } from '../Core/spotify.service';

@Component({
  selector: 'app-access-token',
  template: '',
  styles: []
})
export class AccessTokenComponent implements OnInit {

  constructor(private _SpotifyService: SpotifyService, private _route: Router) {
    const refererURL = sessionStorage.getItem('refererURL');
    if(refererURL){

      sessionStorage.removeItem('refererURL');
      window.location.href = refererURL

    }else{

      this._route.navigate(['/']);

    }
  }

  ngOnInit(): void {
  }

}