import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './Core/spotify.service';
import { AuthGuardService } from './Core/auth-guard.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { AccessTokenComponent } from './access-token/access-token.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    HomePageComponent,
    SearchPageComponent,
    ToolbarComponent,
    HttpClientModule,
    MatToolbar,
    MatIcon,
    RouterModule.forRoot(ROUTES, {useHash: true})
   
  ],
  providers: [
    SpotifyService, AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
