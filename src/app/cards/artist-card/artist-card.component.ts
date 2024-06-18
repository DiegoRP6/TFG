import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {
  
  @Input() items: any[] = [];
  constructor( private router: Router) { }
  
  verArtista( item: any ) {
    let artistaId;

    if ( item.type === "artist") {
      artistaId = item.id
    } else {
      artistaId = item.artists[0].id
    }
    this.router.navigate(['/artist', artistaId])
  }

  ngOnInit(): void {
  }

}
