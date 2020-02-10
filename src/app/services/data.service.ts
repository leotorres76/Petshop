import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' //injeta como dependencia em todos os modulos que chamarem a classe DataService (Ex: login-page)
})

export class DataService {

  public url = 'http://localhost:3000/v1';
  
  constructor (private http: HttpClient){}
  
  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);//retorna array do tipo/model Product
  }

  authenticate(data) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

}