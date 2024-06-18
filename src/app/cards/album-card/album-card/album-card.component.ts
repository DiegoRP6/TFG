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
    let albumId = album.id; 
    console.log('ID del álbum:', albumId); // Agregar un log para verificar el ID del álbum

    this.router.navigate(['/album', albumId]); // Navega a la página del álbum utilizando su ID
  }

}
