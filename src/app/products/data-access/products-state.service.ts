import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from './products.service';
import { signalSlice } from 'ngxtension/signal-slice';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

interface State {
  products: Product[];
  status: 'loading' | 'success' | 'error';
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsStateService {
  private productsService = inject(ProductsService);

  private initialState: State = {
    products: [],
    status: 'loading' as const,
    page: 1,
  };

  changePage$ = new Subject<number>();

  loadProducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.productsService.getProducts(page)),
    map((products: Product[]) => ({
      products,
      status: 'success' as const,
    })),
    catchError(() => {
      return of({
        products: [],
        status: 'error' as const,
      });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({
          page,
          status: 'loading' as const,
        })),
      ),
      this.loadProducts$,
    ],
  });

  // state = signalSlice({
  //   initialState: this.initialState,
  //   sources: [
  //     this.productsService.getProducts().pipe(
  //       map((products: Product[]) => ({
  //         products,
  //         status: 'success' as const,
  //       })),
  //     ),
  //   ],
  // });
}
