import { Routes } from '@angular/router';
import { CategoryCreatePageComponent } from './categoryCreatePage/categoryCreatePage.component';
import { CategoryEditPageComponent } from './categoryEditPage/categoryEditPage.component';
import { CategoryListPageComponent } from './categoryListPage/categoryListPage.component';
import { CategoryDetailPageComponent } from './categoryDetailPage/categoryDetailPage.component';

const routes: Routes = [
    {
    path: 'create',
    component: CategoryCreatePageComponent
  },
  {
    path: 'edit/:id',
    component: CategoryEditPageComponent
  },
  {
    path: '',
    component: CategoryListPageComponent
  },
  {
    path: 'detail/:id',
    component: CategoryDetailPageComponent
  }
];

export default routes;
