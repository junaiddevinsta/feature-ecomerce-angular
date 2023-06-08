import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  isButtonClicked = true;
  private activeComponent = new BehaviorSubject<string | null>('profileInfo');
  activeComponent$ = this.activeComponent.asObservable();
  get activeComponentValue(): string | null {
    return this.activeComponent.getValue();
  }
  showComponent(componentName: string | null) {
    this.activeComponent.next(componentName);
  }
  onButtonClick() {
    this.isButtonClicked = !this.isButtonClicked;
  }
  constructor() { }
}
