import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./authservice";

@Injectable()
export class LoginAuthService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  loginAlert() {
    const confirmed = window.confirm('Kindly log in to continue.'); // Display confirmation dialog
    if (confirmed) {
      this.router.navigate(['/login']); // Navigate back if confirmed
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.IsAuthenticated()) {
      return true;
    } else {
      this.loginAlert();
      return false;
    }
  }
}
