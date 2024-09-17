import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/features/product-shell/product.route'),
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
