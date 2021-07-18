import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HttpClientModule } from  '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
// MDB Angular Free
// import { WavesModule, CardsFreeModule } from '@angular-bootstrap-md'

import {MatInputModule} from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';

import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { ToastModule } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule,
    MatCardModule,
    MatBadgeModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: true}),
    ToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { 
 
}
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}