import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  verAlbum(album: any) {
    let albumId = album.id; // Suponiendo que el objeto álbum tiene un campo `id` que identifica de manera única al álbum
    this.router.navigate(['/album', albumId]); // Navega a la página del álbum utilizando su ID
  }

}
