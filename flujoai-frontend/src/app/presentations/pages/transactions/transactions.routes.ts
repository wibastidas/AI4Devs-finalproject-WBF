import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./transactionListPage/transactionListPage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-list',
      title: 'Transacciones',
      description: 'Lista de transacciones'
    }
  },
  {
    path: 'create',
    loadComponent: () => import('./transactionCreatePage/transactionCreatePage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-plus',
      title: 'Crear Transacción',
      description: 'Crear una nueva transacción'
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./transactionDetailPage/transactionDetailPage.component').then(m => m.default),
    data: {
      icon: 'fa-solid fa-info-circle',
      title: 'Detalle de Transacción',
      description: 'Ver detalles de la transacción'
    }
  }
];

export default routes;
