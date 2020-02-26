import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' //injeta como dependencia em todos os modulos que chamarem a classe DataService (Ex: login-page)
})

export class DataService {

  public url = 'http://localhost:3000/v1';
  
  constructor (private http: HttpClient){}
  
  public composeHeaders(){
    const token = localStorage.getItem('petshop-token');
    const headers = new HttpHeaders().set('Authorization',`bearer ${token}`);
    return headers;
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);//retorna array do tipo/model Product
  }

  authenticate(data) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${this.url}/accounts/refresh-token`,
                          null,
                          { headers: this.composeHeaders() }
    );
  }

}