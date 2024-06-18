
import { Routes } from '@angular/router';
import { AccessTokenComponent } from './access-token/access-token.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainComponent } from './main/main.component';
import { ArtistaComponent } from './artista/artista.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { SongSearchComponent } from './song-search/song-search.component';
import { AlbumComponent } from './album/album.component';


export const ROUTES: Routes = [
  { path: "home", component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: "search", component: SearchPageComponent},
  { path: "search/albums", component: AlbumSearchComponent},
  { path: "search/songs", component: SongSearchComponent},

  { path: "access-token", component: AccessTokenComponent},
  { path: "main", component: MainComponent},
  { path: "artist/:id", component: ArtistaComponent, canActivate: [AuthGuardService]},
  { path: "album/:id", component: AlbumComponent, canActivate: [AuthGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];
