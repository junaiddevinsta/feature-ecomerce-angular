export interface product{
    sku:string,
    brand:string
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined | number,
    productId:undefined|number
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