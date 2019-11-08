/**
* login gaurd
* Login Guard features are designed to protect login and authentication system against login attacks.
* @package LoginGuard
* @subpackage app\core\garuds\logingaurd
* @author SEPA Cyber Technologies, Sayyad M.
*/
import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routerNavigate: Router
  ) { }
  canActivate(): boolean {
    if (JSON.parse(localStorage.getItem('redirect')) != true) {
      if (this.authService.isAuthenticate() && this.authService.accountMatch(['Personal'])) {
        this.routerNavigate.navigate(['home/account-index/getaccount']);
        return false;
      }
      if (this.authService.isAuthenticate() && this.authService.accountMatch(['Business'])) {
        this.routerNavigate.navigate(['business-application']);
        return false;
      }
      if (this.authService.isAuthenticate() && this.authService.accountMatch(['sandbox'])) {
        this.routerNavigate.navigate(['sandbox']);
        return false;
      }
    }
    else {
    setTimeout(function () { localStorage.removeItem('redirect') }, 300);
    }
    return true;
  }
}
