import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<Product[]>;

  //injetamos a Classe DataService para poder realizar as requisições
  constructor(private data: DataService) {}

  ngOnInit() {
    this.products$ = this.data.getProducts()
  }
}
