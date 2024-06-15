
import { Routes } from '@angular/router';
import { AuthGuardService } from './Core/auth-guard.service';
import { AccessTokenComponent } from './access-token/access-token.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainComponent } from './main/main.component';


export const ROUTES: Routes = [
  { path: "home", component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: "search", component: SearchPageComponent},
  { path: "access-token", component: AccessTokenComponent},
  { path: "main", component: MainComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},

  // { path: "artista", component: ArtistaComponent}
  
];
