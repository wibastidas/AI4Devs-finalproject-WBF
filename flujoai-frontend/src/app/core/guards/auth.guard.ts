import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../presentations/services/AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAuth = route.data['requiresAuth'] !== false;
    const isAuthenticated = this.authService.isAuthenticated();

    if (requiresAuth && !isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (isAuthenticated && !requiresAuth) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
