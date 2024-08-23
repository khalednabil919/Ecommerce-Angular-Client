import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  OrderNow(obj:any)
  {
    console.log(obj)
    return this.http.post(environment.baseUrl+'carts',obj);
  }
}
