import { Component, OnInit, inject } from '@angular/core';
import { SignalsService } from '../shared/signals.service';
import { ProductsService } from '../products/data-access/products.service';
import { interval } from 'rxjs';
import { ProductsStateService } from '../products/data-access/products-state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  signals = inject(SignalsService);
  productsService = inject(ProductsService);
  myObservable = interval(1000);
  productState = inject(ProductsStateService);
  ngOnInit(): void {
    this.signals.count.update((value) => value + 1);
    console.log('Count:', this.signals.count());
    // this.myObservable.pipe().subscribe((res) => console.log(res));
    this.productState.loadProducts$.subscribe((res) => {
      console.log({ res });
    });
  }
  pagina2() {
    this.productState.changePage$.next(4);
  }
}
