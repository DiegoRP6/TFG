import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './Services/spotify.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './shared/loading/loading.component';
import { ArtistaComponent } from './artista/artista.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { MainComponent } from './main/main.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { TarjetasComponent } from './cards/artist-card/tarjetas.component';
import { AlbumSearchComponent } from './album-search/album-search.component';
import { AlbumCardComponent } from './cards/album-card/album-card/album-card.component';
import { SongSearchComponent } from './song-search/song-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    HomePageComponent,
    SearchPageComponent,
    LoadingComponent,
    AlbumCardComponent,
    AlbumSearchComponent,
    SongSearchComponent,
    NoimagePipe,
    DomseguroPipe,
    ArtistaComponent,
    MainComponent,
    ToolbarComponent,
    ArtistaComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule, 
    NgxAudioPlayerModule,
    MatIconModule, 
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    SpotifyService, 
    AuthGuardService
  ],
  exports: [
    ToolbarComponent  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
