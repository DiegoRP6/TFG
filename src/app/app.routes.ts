
import { Routes } from '@angular/router';
import { AccessTokenComponent } from './access-token/access-token.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainComponent } from './main/main.component';
import { ArtistaComponent } from './artista/artista.component';
import { AuthGuardService } from './Services/auth-guard.service';


export const ROUTES: Routes = [
  { path: "home", component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: "search", component: SearchPageComponent},
  { path: "access-token", component: AccessTokenComponent},
  { path: "main", component: MainComponent},
  { path: "artist/:id", component: ArtistaComponent, canActivate: [AuthGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
  
];
