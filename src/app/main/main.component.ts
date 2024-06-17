import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../Services/spotify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  savedTracks: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  currentSong: any = null; // Track currently being played
  playlist: any[] = []; // Playlist of tracks for ngx-audio-player

  audioPlayer: HTMLAudioElement = new Audio();
  isPlaying: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getSavedTracks()
      .subscribe(
        (data: any[]) => {
          this.savedTracks = data;
          this.loading = false;
          // Filter tracks with preview_url and construct playlist
          this.playlist = data.filter(track => !!track.track.preview_url)
                              .map(track => ({
                                title: track.track.name,
                                link: track.track.preview_url,
                                artist: track.track.artists[0].name,
                                duration: track.track.duration_ms,
                                artwork: track.track.album.images[0]?.url
                              }));
        },
        (error) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = `Error: ${error.status} - ${error.statusText}`;
          console.error('Error fetching saved tracks:', error);
        }
      );
  }

  removeTrack(track: any): void {
    const trackId = track.track.id; // Assuming track has an id property
    this.spotifyService.removeSavedTrack(trackId)
      .subscribe(
        () => {
          // Remove track from savedTracks array locally
          this.savedTracks = this.savedTracks.filter(t => t.track.id !== trackId);
        },
        (error) => {
          console.error('Error removing track:', error);
          // Handle error (e.g., show error message)
        }
      );
  }

  playTrack(track: any): void {
    // Load the iframe for preview_url
    this.audioPlayer.src = track.track.preview_url;
    this.audioPlayer.load();
  }

  formatDuration(duration_ms: number): string {
    const minutes: number = Math.floor(duration_ms / 60000);
    const seconds: number = Math.floor((duration_ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}
