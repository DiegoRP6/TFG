import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent {
  @Input() playlistData: any;
  @Output() crearPlaylist = new EventEmitter<any>();
  dialogRef: any;

  onSubmit() {
    this.crearPlaylist.emit(this.playlistData);
  }
}
