import { Routes } from '@angular/router';
import { AccountCreatePageComponent } from './accountCreatePage/accountCreatePage.component';
import { AccountEditPageComponent } from './accountEditPage/accountEditPage.component';
import { AccountListPageComponent } from './accountListPage/accountListPage.component';
import { AccountDetailPageComponent } from './accountDetailPage/accountDetailPage.component';

const routes: Routes = [
    {
    path: 'create',
    component: AccountCreatePageComponent
  },
  {
    path: 'edit/:id',
    component: AccountEditPageComponent
  },
  {
    path: '',
    component: AccountListPageComponent
  },
  {
    path: 'detail/:id',
    component: AccountDetailPageComponent
  }
];

export default routes;
