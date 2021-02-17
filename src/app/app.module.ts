import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowListComponent } from './show-list/show-list.component';
import {MovieService} from './service/movie.service';
import {HomeComponent} from './home/home.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowListComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
