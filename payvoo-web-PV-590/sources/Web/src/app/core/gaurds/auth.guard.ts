
/**
* auth gaurd
* This service injects AuthService and Router and has a single method called canActivate 
* @package AuthGuard
* @subpackage app\core\garuds\authgarud
* @author SEPA Cyber Technologies, Sayyad M.
*/
import { AuthService } from "../shared/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routerNavigate: Router
  ) {}

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticate()) {
      this.routerNavigate.navigate(['']);
      return false;
    }
    // return true
    else{
      let userAccount=next.data["userAccount"] as Array<string>;
      if(userAccount){
        var match=this.authService.accountMatch([userAccount]);
        if(match){
          return true;
        }
        else{
          this.routerNavigate.navigate(["error-page"]);
          return false;
        }
      }
    }
   
  }
}

