import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public credentials = {
    clientId: 'd71ba7ba504e4be9a3dee860ce483d77',
    clientSecret: 'c372783099b14445a21a5e1bdf9d0747',
    accessToken: '',
    userId: '' // Added userId property
  };

  public poolURlS = {
    authorize: 'https://accounts.spotify.com/es-ES/authorize' +
      '?client_id=' + this.credentials.clientId +
      '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent('http://localhost:4200/callback') +
      '&scope=' + encodeURIComponent('user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private') + 
      '&expires_in=3600',
    refreshAccessToken: 'https://accounts.spotify.com/api/token'
  };

  constructor(private _http: HttpClient) { 
    this.upDateToken();
    this.getUserId(); // Retrieve user ID on service initialization
  }

  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
    console.log('Token actualizado:', this.credentials.accessToken);
  }

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.get(URL, HEADER);
  }

  postQuery(query: string, data: any) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.post(URL, data, HEADER);
  }

  checkTokenSpoLogin() {
    if (!this.checkTokenSpo()) {
      sessionStorage.setItem('refererURL', location.href);
      window.location.href = this.poolURlS.authorize;
    }
  }

  checkTokenSpo() {
    return !!this.credentials.accessToken;
  }

  tokenRefreshURL() {
    if (this.checkTokenSpo()) {
      alert('Expiro la sesión');
      this.credentials.accessToken = '';
      sessionStorage.removeItem('token');
      this.checkTokenSpoLogin();
    }
  }

  // Retrieve user ID
  getUserId() {
    this.getQuery('me').subscribe((data: any) => {
      this.credentials.userId = data.id;
    });
  }

  getFeaturedPlaylists() {
    return this.getQuery(`browse/featured-playlists`)
      .pipe(map((data: any) => data.playlists.items));
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }

  getAlbums(termino: string) {
    return this.getQuery(`search?q=${termino}&type=album&limit=15`)
      .pipe(map((data: any) => data.albums.items));
  }

  getAlbum(id: string){
    return this.getQuery(`albums/${id}`)
      .pipe(map((data: any) => data));
  }

  getAlbumTracks(id: string): Observable<any> {
    return this.getQuery(`albums/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  getTracks(termino: string) {
    return this.getQuery(`search?q=${termino}&type=track&limit=12`)
      .pipe(map((data: any) => data.tracks.items));
  }

  getPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`);
  }

  getPlaylistTracks(id: string) {
    return this.getQuery(`playlists/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=US`)
      .pipe(map((data: any) => data["tracks"]));
  }

  getUserPlaylists() {
    return this.getQuery(`me/playlists`)
      .pipe(map((data: any) => data.items));
  }

  getSavedTracks() {
    return this.getQuery(`me/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Método para crear una nueva lista de reproducción
  createPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const data = {
      name: name,
      description: description,
      public: isPublic
    };
    return this.postQuery(`users/${this.credentials.userId}/playlists`, data)
      .pipe(map((data: any) => data));
  }

  addTrackToPlaylist(playlistId: string, trackUri: string): Observable<any> {
    return this.postQuery(`playlists/${playlistId}/tracks`, { uris: [trackUri] })
      .pipe(map((data: any) => data));
  }
}
