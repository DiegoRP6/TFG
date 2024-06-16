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
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ArtistaComponent } from './artista/artista.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    NavbarComponent,
    HomePageComponent,
    SearchPageComponent,
    LoadingComponent,
    NoimagePipe,
    DomseguroPipe,
    MainComponent,
    ToolbarComponent,
    ArtistaComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbar,
    MatIcon,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [
    SpotifyService, AuthGuardService
  ],
  exports: [
    ToolbarComponent  // Añade esto para exportar ToolbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
