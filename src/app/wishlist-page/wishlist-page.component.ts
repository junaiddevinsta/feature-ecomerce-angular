import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { wishlist } from '../data-type';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  singleUserWishlistData:any;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.wishlistData()
  }
  wishlistData(){
    this.product.currentCart().subscribe((res)=>{
      this.singleUserWishlistData=res;
      console.log("single user wishlist data=>",this.singleUserWishlistData);
    })
}
}
