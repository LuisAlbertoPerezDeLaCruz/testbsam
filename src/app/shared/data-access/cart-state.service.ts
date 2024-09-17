import { effect, inject, Injectable, Signal } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';
import { ProductItemCart } from '../interfaces/product.interface';

interface State {
  products: ProductItemCart[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  constructor() {
    effect(() => {
      if (this.state.loaded() === true) {
        console.log(this.state.products());
        this.storageService.saveProducts(this.state.products());
      }
    });
  }

  private storageService = inject(StorageService);

  private initialState: State = {
    products: [],
    loaded: false,
  };

  loadProducts$ = this.storageService
    .loadProducts()
    .pipe(map((products) => ({ products, loaded: true })));

  public state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      add: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(map((product) => this.add(state, product))),
    },
  });

  private add(state: Signal<State>, product: ProductItemCart) {
    const isInCart = state().products.find((productinCart) => {
      return productinCart.product.id === product.product.id;
    });
    if (!isInCart) {
      return {
        products: [...state().products, { ...product, quantity: 1 }],
      };
    }

    isInCart.quantity++;

    return {
      products: [...state().products],
    };
  }
}
