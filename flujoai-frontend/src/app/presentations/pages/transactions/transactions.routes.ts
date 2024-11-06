import { Routes } from '@angular/router';
import { TransactionCreatePageComponent } from './transactionCreatePage/transactionCreatePage.component';
import { TransactionEditPageComponent } from './transactionEditPage/transactionEditPage.component';
import { TransactionListPageComponent } from './transactionListPage/transactionListPage.component';
import { TransactionDetailPageComponent } from './transactionDetailPage/transactionDetailPage.component';

const routes: Routes = [
  {
    path: 'create',
    component: TransactionCreatePageComponent
  },
  {
    path: 'edit/:id',
    component: TransactionEditPageComponent
  },
  {
    path: '',
    component: TransactionListPageComponent
  },
  {
    path: 'detail/:id',
    component: TransactionDetailPageComponent
  }
];

export default routes;
