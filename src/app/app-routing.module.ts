import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthService } from './auth.service';
const routes: Routes = [{path:'',component:LandingpageComponent},{path:'home', component:HomeComponent , canActivate:[AuthService ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
