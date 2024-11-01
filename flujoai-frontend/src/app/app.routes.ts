import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentations/layouts/dashboardLayout/dashboardLayout.component';
import { AuthLayoutComponent } from './presentations/layouts/authLayout/authLayout.component';
import { AuthGuardService } from './core/guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './presentations/services/AuthService.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./presentations/pages/auth/loginPage/loginPage.component'),
        data: {
          icon: 'fa-solid fa-sign-in-alt',
          title: 'Login',
          description: 'Iniciar sesión',
        },
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./presentations/pages/auth/forgotPasswordPage/forgotPasswordPage.component'),
        data: {
          icon: 'fa-solid fa-key',
          title: 'Recuperar Contraseña',
          description: 'Recuperar tu contraseña',
        },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./presentations/pages/auth/registerPage/registerPage.component'),
        data: {
          icon: 'fa-solid fa-user-plus',
          title: 'Registro',
          description: 'Crear una cuenta nueva',
        },
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./presentations/pages/auth/resetPasswordPage/resetPasswordPage.component'),
        data: {
          icon: 'fa-solid fa-unlock-alt',
          title: 'Restablecer Contraseña',
          description: 'Restablecer tu contraseña',
        },
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'transactions',
        loadComponent: () =>
          import('./presentations/pages/transactions/transactionListPage/transactionListPage.component'),
        data: {
          icon: 'fa-solid fa-exchange-alt',
          title: 'Transacciones',
          description: 'Lista de transacciones',
        },
      },
      {
        path: 'transactions/create',
        loadComponent: () =>
          import('./presentations/pages/transactions/transactionCreatePage/transactionCreatePage.component'),
        data: {
          icon: 'fa-solid fa-plus',
          title: 'Crear Transacción',
          description: 'Crear una nueva transacción',
        },
      },
      {
        path: 'transactions/:id',
        loadComponent: () =>
          import('./presentations/pages/transactions/transactionDetailPage/transactionDetailPage.component'),
        data: {
          icon: 'fa-solid fa-receipt',
          title: 'Detalle de Transacción',
          description: 'Detalles de la transacción',
        },
      },
      {
        path: 'assistant',
        loadComponent: () =>
          import('./presentations/pages/assistantPage/assistantPage/assistantPage.component'),
        data: {
          icon: 'fa-solid fa-user',
          title: 'Asistente',
          description: 'Información del asistente',
        },
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./presentations/pages/accounts/accountListPage/accountListPage.component'),
        data: {
          icon: 'fa-solid fa-list',
          title: 'Cuentas',
          description: 'Lista de cuentas',
        },
      },
      {
        path: 'accounts/create',
        loadComponent: () =>
          import('./presentations/pages/accounts/accountCreatePage/accountCreatePage.component'),
        data: {
          icon: 'fa-solid fa-plus-circle',
          title: 'Crear Cuenta',
          description: 'Crear una nueva cuenta',
        },
      },
      {
        path: 'accounts/:id',
        loadComponent: () =>
          import('./presentations/pages/accounts/accountDetailPage/accountDetailPage.component'),
        data: {
          icon: 'fa-solid fa-info-circle',
          title: 'Detalle de Cuenta',
          description: 'Detalles de la cuenta',
        },
      },
      {
        path: 'accounts/:id/edit',
        loadComponent: () =>
          import('./presentations/pages/accounts/accountEditPage/accountEditPage.component'),
        data: {
          icon: 'fa-solid fa-edit',
          title: 'Editar Cuenta',
          description: 'Editar detalles de la cuenta',
        },
      },
    ],
  },
  {
    path: '**',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full'
      }
    ]
  },
];
