import { Injectable } from "@angular/core";
import { products } from "./products.model";
import { Store, StoreConfig } from "@datorama/akita";
export interface productsState{
  product:products[],
  isLoaded: boolean;
}
export const getInitialState = () => {
  return {
    product: [],
    isLoaded: false,

  };
};
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'product' })
export class productsStore extends Store<productsState> {
  constructor() {
    super(getInitialState());
  }
}
