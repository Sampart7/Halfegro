import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../models/product";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    createProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.baseUrl + "product", product);
    }
  
    updateProduct(product: Product): Observable<void> {
      return this.http.put<void>(this.baseUrl + "product/" + product.id, product);
    }
  
    deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(this.baseUrl + "product/" + id);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "product");
    }
}
