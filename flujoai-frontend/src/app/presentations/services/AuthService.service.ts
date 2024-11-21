import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { loginUseCase } from '@use-cases/user.use-case';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSignal = signal<any>(null);
  private readonly tokenSignal = signal<string | null>(null);

  public readonly isAuthenticated = computed(() => !!this.tokenSignal());
  public readonly currentUser = computed(() => this.currentUserSignal());

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSignal.set(token);
    }
  }

  async login(email: string, password: string) {
    const result = await loginUseCase({ email, password });
    
    if (result.ok && result.token) {
      this.tokenSignal.set(result.token);
      this.currentUserSignal.set(result.user);
      this.router.navigate(['/dashboard']);
      return true;
    }
    
    return false;
  }

  logout(): void {
    // Eliminar token
    localStorage.removeItem('token');
    // Eliminar thread del asistente si existe
    localStorage.removeItem('thread');
    
    // Limpiar signals
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
    
    // Redireccionar a login
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
