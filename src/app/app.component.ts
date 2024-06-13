import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from './Core/spotify.service';
import { PreviousRouteService } from './Core/previous-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private _activatedRoute: ActivatedRoute, private _location: Location, private _previousRouteService: PreviousRouteService, 
    private _router: Router, private _SpotifyService: SpotifyService){

    this._previousRouteService.registerUrls();

    function getHashParams(q: any) {
      let hashParams: any = {}, e, r = /([^&;=]+)=?([^&;]*)/g;

      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    this._router.events.subscribe(data => {

      if (data instanceof RoutesRecognized) {

        const URL = this._location.path();

        if (URL.split('=')[0] === 'access_token') {

          let param = getHashParams(URL);
          const NewToken = param['access_token'];
          NewToken && (sessionStorage.setItem('token', NewToken), this._SpotifyService.upDateToken());

        }

      }

    });

  }

  ngOnInit() {

  }
}
