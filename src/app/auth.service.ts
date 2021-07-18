import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
import{Router} from '@angular/router';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : DataService, private router:Router) { }

  canActivate(): boolean  {
    if(this.auth.loggedin()){
      
      return true;
  }
  else{
   this.router.navigate([""]);
    return false;
  }
  }
}
