import { Component, inject, input, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../data-access/products.service';

import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [],
})
export default class ProductDetailComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  productId = 0;
  id = input.required<string>();

  productDetailState = inject(ProductDetailStateService).state;

  constructor() {
    effect(() => {
      this.productId = Number(this.id());
      this.productDetailState.getById(this.productId);
      // this.productsService
      //   .getProduct(this.productId)
      //   .pipe()
      //   .subscribe((product: Product) => {
      //     console.log({ product });
      //   });
    });
  }
}
