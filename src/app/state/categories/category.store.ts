import { Store, StoreConfig } from "@datorama/akita";
import { category } from "./categorymodel";
import { Injectable } from "@angular/core";
export interface categoryState{
  category:category[],
  isLoaded: boolean;
}
export const getInitialState = () => {
  return {
    category: [],
    isLoaded: false,

  };
};
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'category' })
export class categoryStore  extends Store<categoryState> {
  constructor() {
    super(getInitialState());
  }
}
