import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { productWithAmount } from '../../../models/ProductWithAmount';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit{

  products :Product[] = [];
  categories :string[] = [];
  cart:any[]=[];
  loading:boolean = false;
  ngOnInit()
  {
    this.getProducts();
    this.getCategories();
  }
  constructor(private service:ProductsService,private router:Router, private activateRoute:ActivatedRoute ){}
 
  getProducts(){
    this.loading = true;
    console.log(this.loading);
    this.service.getAllProducts().subscribe((res:any)=>{
      this.loading = false;
      console.log(this.loading);
      this.products = res;
      console.log(res);
    },   error=>{
      console.log(error);
      this.loading = false;
      alert(error)
    })
  }
  getCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories = res;
    }, error=>{
      console.log(error);
      alert(error);
    })
  }

  filterByCategory(event:any){
    this.loading = true;
    let categoryName:string = event.target.value;
    console.log(categoryName);
    if(categoryName ==='all')
    {
      this.getProducts();
    }
    else
    {
          this.service.getProductsByCategory(categoryName).subscribe((res:any)=>{
            this.loading = false;
            this.products = res;
          }, error=>{
          this.loading = false;
            alert(error)
          } )
    }
   
  }

  addItemToCart(event:any){
    console.log(event);
    if('cart' in localStorage)
    {
      this.cart = JSON.parse(localStorage.getItem('cart')!)
      if(!this.cart.find(x=>x.item.id == event.item.id))
      {
        this.cart.push(event)
      }
      else
      {
        for(let i in this.cart)
        {
          if(event.item.id === this.cart[i].item.id)
          {
            this.cart[i].quantity += event.quantity
          }
        }
      }
      localStorage.setItem('cart',JSON.stringify(this.cart));
      return;
    }
    console.log(event);
    this.cart.push(event);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}
