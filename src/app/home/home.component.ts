import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductDto} from "../models/dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private product = 'beef';
  showModal = false;
  url = '';
  products: ProductDto[] = [];
  page = 1;
  total = 1;
  limit = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.search(this.product);
  }

  show(url: string) {
    this.showModal = true;
    this.url = url;
  }

  hide() {
    this.showModal = false;
  }

  search(product: string): void {
    this.product = product.replace(' ', '-');
    if (this.product == '') {
      this.product = 'beef';
    }
    this.page = 1;
    this.productService
      .getKrogerProducts$(this.product, this.page)
      .subscribe(result => {this.products = result.products
        this.page = result.start
        this.total = result.total - 4
        this.limit = result.limit
      });
  }

  getPage(): void {
    this.productService.getKrogerProducts$(this.product, this.page)
      .subscribe(result => {this.products = result.products});
  }
}
