import { Query } from "@datorama/akita";
import { productsState } from "./products.store";
import { productsStore } from "./products.store";
import { Observable } from "rxjs";
import { products } from "./products.model";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class productsQuery extends Query<productsState> {

  constructor(private productsStore: productsStore) {
    super(productsStore);
  }
  getProducts(): Observable<products[]> {
    return this.select(state => state.product);
  }
  getLoaded(): Observable<boolean> {
    return this.select(state => state.isLoaded);
  }
  getIsLoading(): Observable<boolean> {
    return this.selectLoading();
  }
}
