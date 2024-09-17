import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  public count = signal(0);
  constructor() {}
}
