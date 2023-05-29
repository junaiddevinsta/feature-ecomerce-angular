import { Query } from "@datorama/akita";
import { categoryState, categoryStore } from "./category.store";
import { Observable } from "rxjs";
import { category } from "./categorymodel";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class categoryQuery extends Query<categoryState> {
  constructor(private categoryStore: categoryStore) {
    super(categoryStore);
  }
  getCategory(): Observable<category[]> {
    return this.select(state => state.category);
  }
  getLoaded(): Observable<boolean> {
    return this.select(state => state.isLoaded);
  }
  getIsLoading(): Observable<boolean> {
    return this.selectLoading();
  }

}
