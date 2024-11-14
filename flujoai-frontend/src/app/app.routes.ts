import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentations/layouts/dashboardLayout/dashboardLayout.component';
import { AuthLayoutComponent } from './presentations/layouts/authLayout/authLayout.component';
import { AuthGuardService } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // Rutas protegidas
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    data: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('@app/presentations/pages/dashboard/dashboardPage/dashboardPage.component'),
        data: {
          icon: 'fa-solid fa-home',
          title: 'Dashboard',
          description: 'Panel principal'
        }
      },
      {
        path: 'transactions',
        loadChildren: () => 
          import('@app/presentations/pages/transactions/transactions.routes'),
        data: {
          icon: 'fa-solid fa-exchange-alt',
          title: 'Transacciones',
          description: 'Gestión de transacciones'
        }
      },
      {
        path: 'accounts',
        loadChildren: () => 
          import('@app/presentations/pages/accounts/accounts.routes'),
        data: {
          icon: 'fa-solid fa-wallet',
          title: 'Cuentas',
          description: 'Gestión de cuentas'
        }
      },
      {
        path: 'assistant',
        loadComponent: () =>
          import('./presentations/pages/assistantPage/assistantPage.component'),
        data: {
          icon: 'fa-solid fa-user',
          title: 'Asistente',
          description: 'Tu asistente financiero'
        }
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./presentations/pages/categories/categories.routes'),
        data: {
          icon: 'fa-solid fa-tags',
          title: 'Categorías',
          description: 'Gestión de categorías'
        }
      }
    ]
  },
  // Rutas públicas
  {
    path: 'auth',
    component: AuthLayoutComponent,
    data: { requiresAuth: false },
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./presentations/pages/auth/loginPage/loginPage.component'),
        data: {
          icon: 'fa-solid fa-sign-in-alt',
          title: 'Login',
          description: 'Iniciar sesión'
        }
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./presentations/pages/auth/registerPage/registerPage.component'),
        data: {
          icon: 'fa-solid fa-user-plus',
          title: 'Registro',
          description: 'Crear una cuenta nueva'
        }
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./presentations/pages/auth/forgotPasswordPage/forgotPasswordPage.component'),
        data: {
          icon: 'fa-solid fa-key',
          title: 'Recuperar Contraseña',
          description: 'Recuperar tu contraseña'
        }
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./presentations/pages/auth/resetPasswordPage/resetPasswordPage.component'),
        data: {
          icon: 'fa-solid fa-unlock-alt',
          title: 'Restablecer Contraseña',
          description: 'Restablecer tu contraseña'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
