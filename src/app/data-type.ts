export interface product{
    variations: any
    sku:string,
    brand:string
    name:string,
    old_price:number,
    reviews:string
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined | number,
    productId:undefined|number,
    // variations?: variation[];
  }
  export interface category{
    id:number,
    category_image:string,
    category:any,
    catId:number,
    quantity:number
  }

  export interface cart{
    sku:string,
    brand:string
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number| undefined,
    quantity:undefined | number,
    productId:number,
    userId:number
  }
  export interface checkout{
    sku:string,
    brand:string
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number| undefined,
    quantity:undefined | number,
    productId:number,
    userId:number
  }
  export interface wishlist{
    sku:string,
    brand:string
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number| undefined,
    productId:number,
    userId:number
  }
  export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
    quantity:number,


  }

  export interface priceSummaryRemoveCoupon{
    priceCoupon:number,
    discountCoupon:number,
    taxCoupon:number,
    deliveryCoupon:number,
    totalCoupon:number
    quantityCoupon:number,


  }
  export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    coupon:string
    id:number|undefined
  }
  export interface coupon{
    "code":string,
    "start_date":string,
    "end_date":string,
    "userId": number,
"productId":number,
"coupon_discount":number
  }
  export interface variation{
    "size":string,
    "price":number,
    "quantity":number,
    "color":string
      }
