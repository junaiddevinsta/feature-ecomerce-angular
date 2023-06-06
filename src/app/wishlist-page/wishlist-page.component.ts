import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { wishlist } from '../data-type';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  deleteWishData:any;
  wishData: wishlist[] | undefined;
  singleUserWishlistData:any;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.wishlistData()
  }
  wishlistData(){
    this.product.currentWishlist().subscribe((res)=>{
      this.singleUserWishlistData=res;
      console.log("single user wishlist data=>",this.singleUserWishlistData);
    })
}
removeToWishlist(wishlistId: any | undefined) {
  let user = localStorage.getItem('userid');
  let userId= user && JSON.parse(user);
  console.log("remove wishlist")

  this.product.removeToWishlist(wishlistId)
    .subscribe((result) => {
      this.product.getWishlistList(userId);
      this.deleteWishData=result;
      this.wishlistData();
      this.loadDetails();
      console.log("remove wishlist",this.deleteWishData)
    })
}
loadDetails() {
  this.product.currentWishlist().subscribe((res) => {
    this.wishData=res
    console.log("load wishlist",this.wishData)
  })
}
}
