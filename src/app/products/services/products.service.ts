import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
    return this.http.get(environment.baseUrl + 'products');
  }
  getAllCategories(){
    return this.http.get(environment.baseUrl + 'products/categories' )
  }
  getProductsByCategory(name:string)
  {
    return this.http.get(environment.baseUrl + 'products/category/'+name);
  }
  getProductByID(id:number){
    return this.http.get(environment.baseUrl + 'products/'+id)
  }
}
