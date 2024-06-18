
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainComponent } from './main/main.component';
import { ArtistaComponent } from './artista/artista.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { SongSearchComponent } from './song-search/song-search.component';
import { AlbumComponent } from './album/album.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { PlaylistComponent } from './playlist/playlist.component';


export const ROUTES: Routes = [
  { path: "home", component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: "search", component: SearchPageComponent},
  { path: "search/albums", component: AlbumSearchComponent},
  { path: "search/songs", component: SongSearchComponent},
  { path: "playlist", component: PlaylistPageComponent , canActivate: [AuthGuardService]},
  { path: "main", component: MainComponent},
  { path: "artist/:id", component: ArtistaComponent, canActivate: [AuthGuardService]},
  { path: "album/:id", component: AlbumComponent, canActivate: [AuthGuardService]},
  { path: "playlist/:id", component: PlaylistComponent, canActivate: [AuthGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];
