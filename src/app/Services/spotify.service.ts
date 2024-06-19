import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // Spotify API credentials and user-related information
  public credentials = {
    clientId: 'd71ba7ba504e4be9a3dee860ce483d77',
    clientSecret: 'c372783099b14445a21a5e1bdf9d0747',
    accessToken: '', // Initialize access token
    userId: '' // Initialize user ID
  };

  // Spotify API endpoints
  public poolURlS = {
    authorize: `https://accounts.spotify.com/es-ES/authorize?` +
      `client_id=${this.credentials.clientId}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURIComponent('http://localhost:4200/callback')}` +
      `&scope=${encodeURIComponent('user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private')}` +
      `&expires_in=3600`,
    refreshAccessToken: 'https://accounts.spotify.com/api/token'
  };

  constructor(private _http: HttpClient) { 
    this.upDateToken(); 
    this.getUserId(); 
  }
  
  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
    console.log('Token updated:', this.credentials.accessToken);
  }

  // Construct and execute GET request with authorization header
  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.get(URL, HEADER);
  }

  // Construct and execute POST request with authorization header
  postQuery(query: string, data: any) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.post(URL, data, HEADER);
  }

  // Check if Spotify access token exists; if not, redirect to authorization URL
  checkTokenSpoLogin() {
    if (!this.checkTokenSpo()) {
      sessionStorage.setItem('refererURL', location.href);
      window.location.href = this.poolURlS.authorize;
    }
  }

  // Check if Spotify access token exists
  checkTokenSpo() {
    return !!this.credentials.accessToken;
  }

  // Handle token expiration; clear token and redirect to authorization URL
  tokenRefreshURL() {
    if (this.checkTokenSpo()) {
      alert('Session expired');
      this.credentials.accessToken = '';
      sessionStorage.removeItem('token');
      this.checkTokenSpoLogin();
    }
  }

  // Retrieve user ID from Spotify API
  getUserId() {
    this.getQuery('me').subscribe((data: any) => {
      this.credentials.userId = data.id;
    });
  }

  // Retrieve featured playlists from Spotify API
  getFeaturedPlaylists() {
    return this.getQuery(`browse/featured-playlists`)
      .pipe(map((data: any) => data.playlists.items));
  }

  // Search for artists using search term
  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }

  // Search for albums using search term
  getAlbums(termino: string) {
    return this.getQuery(`search?q=${termino}&type=album&limit=15`)
      .pipe(map((data: any) => data.albums.items));
  }

  // Retrieve album details by album ID
  getAlbum(id: string){
    return this.getQuery(`albums/${id}`)
      .pipe(map((data: any) => data));
  }

  // Retrieve tracks of an album by album ID
  getAlbumTracks(id: string): Observable<any> {
    return this.getQuery(`albums/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Search for tracks using search term
  getTracks(termino: string) {
    return this.getQuery(`search?q=${termino}&type=track&limit=12`)
      .pipe(map((data: any) => data.tracks.items));
  }

  // Retrieve details of a playlist by playlist ID
  getPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`);
  }

  // Retrieve tracks of a playlist by playlist ID
  getPlaylistTracks(id: string) {
    return this.getQuery(`playlists/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Retrieve artist details by artist ID
  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  // Retrieve top tracks of an artist by artist ID
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=US`)
      .pipe(map((data: any) => data["tracks"]));
  }

  // Retrieve user's playlists
  getUserPlaylists() {
    return this.getQuery(`me/playlists`)
      .pipe(map((data: any) => data.items));
  }

  // Retrieve user's saved tracks
  getSavedTracks() {
    return this.getQuery(`me/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Create a new playlist for the user
  createPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const data = {
      name: name,
      description: description,
      public: isPublic
    };
    return this.postQuery(`users/${this.credentials.userId}/playlists`, data)
      .pipe(map((data: any) => data));
  }
//delete a track from a playlist
  deleteTrackFromPlaylist(playlistId: string, trackId: string) {
    const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.credentials.accessToken,
        'Content-Type': 'application/json'
      }),
      body: {
        tracks: [{ uri: `spotify:track:${trackId}` }]
      }
    };
    return this._http.delete(URL, options);
  }
}
