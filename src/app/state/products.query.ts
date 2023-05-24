import { Query } from "@datorama/akita";
import { productsState } from "./products/products.store";
import { productsStore } from "./products/products.store";
import { Observable } from "rxjs";
import { products } from "./products/products.model";



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
