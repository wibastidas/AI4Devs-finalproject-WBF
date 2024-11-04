import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../presentations/services/AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return true;
    }

    return true;
  }
}
