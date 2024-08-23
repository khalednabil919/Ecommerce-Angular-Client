import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  constructor(private cartsService:CartsService){}
  data:any[]=[];
  sendData:any[]=[];
  totalPrice:number = 0 ;
  success:boolean = false;
    ngOnInit()
    {
      this.getCartsProduct()
    }
    getCartsProduct(){
      if('cart' in localStorage)
      {
        this.data = JSON.parse(localStorage.getItem('cart')!);
        this.calcTotalPrice();
      }
    }
    calcTotalPrice(){
      this.totalPrice =0;
      this.data.forEach(x=>this.totalPrice += x.item.price*x.quantity) 
      localStorage.setItem('cart', JSON.stringify(this.data))

    }
    updateLocalStorage(){
      localStorage.setItem('cart', JSON.stringify(this.data))
    }
    minus(i:number){
      if(this.data[i].quantity===0)
      {
        alert('can not be less than zero')
        return ;
      }
      this.data[i].quantity--;
      this.calcTotalPrice();
    }
    plus(i:number){
      this.data[i].quantity++;
      this.calcTotalPrice();
    }

    DeleteProduct(i:number){
      this.data.splice(i,1);
      localStorage.setItem('cart', JSON.stringify(this.data))
      this.calcTotalPrice();
    }
    clearShoppingCart(){
      this.data = [];
      this.calcTotalPrice();
      localStorage.setItem('cart',JSON.stringify(this.data));
    }
    OrderNow(){
      const datePipe = new DatePipe('en-US');
      this.sendData = this.data.map(prod=>{
        return {productId:prod.item.id, quantity:prod.quantity}
      })
      // this.data.forEach(x=>this.sendData.push({productId:x.item.id,quantity:x.quantity}))
      this.cartsService.OrderNow({userId:1, date:datePipe.transform(new Date(), 'yyyy-MM-dd'), products:this.sendData})
      .subscribe(value=>{
        this.success = true;
      },error=>{
        alert("there's error = "+error);
      });
    }
}
