import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {ProductsDto} from "../models/dto";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = `${environment.apiUrl}/products`

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productUrl);
  }


  getKrogerProducts$(product: string, page: number): Observable<ProductsDto> {
    return this.http
      .get<ProductsDto>(`${this.productUrl}/${product}?page=${page}`).pipe(
      // .get<ProductsDto>(`${this.productUrl}/milk`).pipe(
        catchError(this.handleError<ProductsDto>(`getKrogerProducts product=`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
