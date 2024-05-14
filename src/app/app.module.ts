import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RestaurantListComponent } from './Components/restaurants/restaurant-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RestaurantListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
