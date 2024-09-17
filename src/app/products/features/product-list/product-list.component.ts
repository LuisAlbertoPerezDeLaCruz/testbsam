import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [ProductCardComponent],
  providers: [ProductsStateService],
})
export default class ProductListComponent {
  productState = inject(ProductsStateService);
  cartState = inject(CartStateService).state;

  changePage() {
    const page = this.productState.state.page() + 1;
    this.productState.changePage$.next(page);
  }
  addToCart(product: Product) {
    console.log({ product });
    this.cartState.add({ product, quantity: 1 });
  }
}
