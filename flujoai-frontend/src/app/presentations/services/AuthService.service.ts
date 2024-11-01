import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);

  login(username: string, password: string): boolean {
    // Aquí iría la lógica de autenticación real
    if (username === 'user' && password === 'password') {
      this.isAuthenticatedSignal.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
  }

  isAuthenticated(): boolean {
    //return this.isAuthenticatedSignal();
    return true;
  }
}
