import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // Spotify API credentials and user-related information
  public credentials = {
    clientId: 'd71ba7ba504e4be9a3dee860ce483d77',
    clientSecret: 'c372783099b14445a21a5e1bdf9d0747',
    accessToken: '', // Initialize access token
    refreshToken: '', // Refresh token to get a new access token when the current one expires
    userId: '' // Initialize user ID
  };

  // Spotify API endpoints
public poolURlS = {
  authorize: `https://accounts.spotify.com/es-ES/authorize?` +
    `client_id=${this.credentials.clientId}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent('http://localhost:4200/callback')}` +
    `&scope=${encodeURIComponent(
      'user-library-read ' +
      'user-library-modify ' +
      'playlist-read-private ' +
      'playlist-modify-public ' +
      'playlist-modify-private ' +
      'user-follow-read ' +
      'user-top-read ' +
      'user-read-private ' +
      'user-read-email ' +
      'playlist-read-collaborative ' +
      'streaming ' +
      'app-remote-control ' +
      'user-read-playback-state ' +
      'user-modify-playback-state ' +
      'user-read-currently-playing ' +
      'user-follow-modify'
    )}` +
    `&expires_in=3600`,
    refreshAccessToken: 'https://accounts.spotify.com/api/token'
  };

  constructor(private _http: HttpClient) { 
    this.upDateToken();
    this.getUserId();
  }

  // Update the access token from session storage
  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
    this.credentials.refreshToken = sessionStorage.getItem('refresh_token') || ''; // Add refreshToken to session storage
    console.log('Token updated:', this.credentials.accessToken);
  }

  // Refresh access token using the refresh token
  refreshToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': this.credentials.refreshToken,
      'client_id': this.credentials.clientId,
      'client_secret': this.credentials.clientSecret
    }).toString();

    return this._http.post(this.poolURlS.refreshAccessToken, body, { headers })
      .pipe(
        map((response: any) => {
          this.credentials.accessToken = response.access_token;
          sessionStorage.setItem('token', this.credentials.accessToken); // Store the new access token
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          return throwError(error);
        })
      );
  }

  // Construct and execute GET request with authorization header
  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.get(URL, HEADER).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  getIsFollowingQuery<T>(query: string): Observable<T> {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.get<T>(URL, HEADER).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  // Construct and execute POST request with authorization header
  postQuery(query: string, data: any) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };
    return this._http.post(URL, data, HEADER);
  }
  
  putQuery(query: string, data: any) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentials.accessToken,
      'Content-Type': 'application/json'
    });
  
    return this._http.put(URL, data, { headers: HEADER });
  }

  deleteQuery(endpoint: string, data: any) {
    const url = `https://api.spotify.com/v1/${endpoint}`;
    return this._http.delete(url, {
      headers: {
      'Authorization': 'Bearer ' + this.credentials.accessToken,
      'Content-Type': 'application/json'
      },
      body: data  // El cuerpo de la solicitud con los IDs
    });
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
    if (!this.credentials.accessToken) {
      return false;
    }
    // Si es necesario verificar la validez del token, puedes hacer una pequeña solicitud a la API para validar su existencia.
    return !!this.credentials.accessToken;
  }

  // Handle token expiration; clear token and redirect to authorization URL
  tokenRefreshURL() {
    if (!this.credentials.accessToken) {
      alert('Session expired');
      this.credentials.accessToken = '';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refresh_token'); // Also remove the refresh token
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
    return this.getQuery(`artists/${id}/top-tracks?market=US&limit=5`)
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
      .pipe(
        debounceTime(1000), 
        map((data: any) => data.items));
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

  // Delete a track from a playlist
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

  //Get related artists
  getRelatedArtists(id: string) {
    return this.getQuery(`artists/${id}/related-artists?limit=4`)
    .pipe(map((data: any) => data.artists));
  }


  followArtist(ids: string[]) {
    const data = { ids }; // Enviamos los IDs como un array dentro de un objeto
    this.putQuery('me/following?type=artist', data).subscribe(
      (response) => {
        console.log('Artistas seguidos correctamente:', response);
      },
      (error) => {
        console.error('Error al seguir a los artistas:', error);
      }
    );
  }

  unfollowArtist(ids: string[]): void {
    const data = { ids }; // Enviamos los IDs de los artistas a dejar de seguir
    this.deleteQuery('me/following?type=artist', data).subscribe(
      (response) => {
        console.log('Artistas dejados de seguir correctamente:', response);
      },
      (error) => {
        console.error('Error al dejar de seguir a los artistas:', error);
      }
    );
  }
  
  isFollowingArtist(id: string): Observable<boolean[]> {
    return this.getIsFollowingQuery<boolean[]>(`me/following/contains?type=artist&ids=${id}`);
  }
  
  getRandomSong(): Observable<any> {
    // Hacer una búsqueda aleatoria de canciones
    const randomTerm = Math.random().toString(36) // Generar un término de búsqueda aleatorio
    return this.getQuery(`search?q=${randomTerm}&type=track&limit=1&market=ES&genre=reggeaton`) // Buscar canciones utilizando el término aleatorio
      .pipe(
        map((data: any) => {
          // Retornar el primer resultado de la búsqueda
          return data.tracks.items[0];
        })
      );
  }
  

}
