import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product";
import {ShoppingListService} from "../services/shopping-list.service";
import {formatDate} from '@angular/common';
import {RecipeProduct} from "../models/recipe-product";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  allProducts: Product[] = [];
  sumOfProductsPrice: number = 0;
  chosenListProducts: Product[] = []
  toBeConfirmedProducts: RecipeProduct[] = [];
  date: string;
  userLists: string[] = [];


  constructor(private productService: ProductService,
              private shpListService: ShoppingListService) {
    this.date = formatDate(new Date(), 'yyyy/MM/dd-h:mm:ss', 'en');
  }


  ngOnInit(): void {
    this.shpListService.create();
    this.shpListService.currentProducts.subscribe(products => this.toBeConfirmedProducts = products);
    this.shpListService.getUserShoppingList().subscribe(products => products.forEach(products => products.forEach(product => this.allProducts.push(product))));
    this.shpListService.getUserShoppingList().subscribe(products => products.forEach(products => products.forEach(product => {
      if (!this.userLists.includes(product.date)) {
        this.userLists.push(product.date)
      }
      this.userLists = this.userLists.sort((a, b) => (a > b ? -1 : 1));
    })));
  }

  productsApproval(id: number) {
    let index = this.toBeConfirmedProducts.findIndex(product => product.productId == id);
    this.toBeConfirmedProducts[index].isChecked = !this.toBeConfirmedProducts[index].isChecked;
  }

  amountAddition(id: number) {
    let index = this.toBeConfirmedProducts.findIndex(product => product.productId == id);
    this.toBeConfirmedProducts[index].measuresAmount = this.toBeConfirmedProducts[index].measuresAmount + 1;
  }

  amountDeletion(id: number) {
    let index = this.toBeConfirmedProducts.findIndex(product => product.productId == id);
    this.toBeConfirmedProducts[index].measuresAmount = this.toBeConfirmedProducts[index].measuresAmount - 1;
  }

  addToDB(ultimateProducts: RecipeProduct[]) {
    this.shpListService.addRecipe(ultimateProducts.filter(product => product.isChecked), this.date).subscribe();
    this.toBeConfirmedProducts.length = 0;

  }

  uploadContent(userList: any) {
    this.chosenListProducts = [];
    this.allProducts.forEach(product => {
      if (product.date == userList) {
        this.chosenListProducts.push(product)
      }
    })
  }

  printPDF(date: string) {
    let win = window.open('', 'PRINT', 'height=400,width=600');

    if (win) {
      win.document.write('<html lang=""><head><title>' + document.title  + '</title>');
      win.document.write('</head><body >');
      win.document.write('<h1>' + document.title  + '</h1>');
      win.document.write(`<p><strong>Shopping-list - ${date}</strong></p>`);
      win.document.write('<table style="border: black double 2px">')
      win.document.write('<tr><th style="border: black solid 1px">Product Description</th>' +
        '<th style="border: black solid 1px">Amount</th>' +
        '<th style="border: black solid 1px">Grammage</th></tr>');
      for (let i = 0; i < this.chosenListProducts.length; i++) {
        let product = this.chosenListProducts[i];
        win.document.write(`<tr><td style="border: black solid 1px">${product.original}</td>
                <td style="border: black solid 1px; text-align: center;">${product.measuresAmount}</td>
                <td style="border: black solid 1px; text-align: center;">${product.measuresUnitShort}</td></tr>`);
      }
      win.document.write('</table>')
      win.document.write('</body></html>');
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  }
}

