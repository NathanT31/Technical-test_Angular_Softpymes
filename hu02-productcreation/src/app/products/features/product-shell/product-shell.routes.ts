import { Routes } from '@angular/router';

export default [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../product-dashboard/product-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../product-create/product-create.component'),
      },
      {
        path: 'edit/:productId',
        loadComponent: () =>
          import('../product-create/product-create.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;
