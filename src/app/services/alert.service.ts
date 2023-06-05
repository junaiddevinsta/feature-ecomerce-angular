import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  addedWishlistAlert() {
    Swal.fire('Successfully Done!', 'Added to wishlist', 'success');
  }
  addedCartAlert() {
    Swal.fire('Successfully Done!', 'Added to Cart', 'success');
  }
  removeCartAlert() {
    Swal.fire('Successfully Done!', 'Remove to Cart', 'success');
  }
  removeWishlistAlert(){
    Swal.fire('Successfully Done!', 'Remove to Wishlist', 'success');
  }
}
