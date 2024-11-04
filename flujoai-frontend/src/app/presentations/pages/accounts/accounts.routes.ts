import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./accountListPage/accountListPage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-wallet',
      title: 'Cuentas',
      description: 'Lista de cuentas'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./accountCreatePage/accountCreatePage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-plus',
      title: 'Crear Cuenta',
      description: 'Crear una nueva cuenta'
    }
  },
  {
    path: ':id',
    loadComponent: () => 
      import('./accountDetailPage/accountDetailPage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-info-circle',
      title: 'Detalle de Cuenta',
      description: 'Ver detalles de la cuenta'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./accountEditPage/accountEditPage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-edit',
      title: 'Editar Cuenta',
      description: 'Editar detalles de la cuenta'
    }
  }
];

export default routes;
