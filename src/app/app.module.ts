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
import { AlbumSearchComponent } from './album-search/album-search.component';
import { AlbumCardComponent } from './cards/album-card/album-card/album-card.component';
import { SongSearchComponent } from './song-search/song-search.component';
import { AlbumComponent } from './album/album.component';
import { ArtistCardComponent } from './cards/artist-card/artist-card.component';
import { PlaylistCardComponent } from './cards/playlist-card/playlist-card.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { FormsModule, NgModel } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { GuessGameComponent } from './components/guessGame/guess-game.component/guess-game.component.component';
import { SafeUrlPipe } from './pipes/safeUrl.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArtistCardComponent,
    HomePageComponent,
    SearchPageComponent,
    LoadingComponent,
    AlbumCardComponent,
    AlbumSearchComponent,
    PlaylistComponent,
    PlaylistCardComponent,
    PlaylistPageComponent,
    AlbumComponent,
    SongSearchComponent,
    NoimagePipe,
    DomseguroPipe,
    SafeUrlPipe,
    ArtistaComponent,
    MainComponent,
    PlaylistFormComponent,
    ToolbarComponent,
    ArtistaComponent,
    GuessGameComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxAudioPlayerModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    
  ],
  providers: [
    SpotifyService, 
    AuthGuardService,
   ],
  exports: [
    ToolbarComponent  
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
