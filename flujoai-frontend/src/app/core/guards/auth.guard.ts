import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../presentations/services/AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    console.log('AuthGuardService canActivate', this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
