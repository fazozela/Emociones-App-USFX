import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {PrimeNgModule} from "./prime-ng/prime-ng.module";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VideoComponent } from './pages/video/video.component';

import { LandingComponent } from './pages/landing/landing.component';

import { registerLocaleData } from "@angular/common";
import localEs from '@angular/common/locales/es-BO';
registerLocaleData(localEs)

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    PrimeNgModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-BO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
