import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from "../models/stock";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl + "stock");
  }

  createStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.baseUrl + "stock", stock);
  }

  updateStock(stock: Stock): Observable<void> {
    return this.http.put<void>(this.baseUrl + "stock/" + stock.id, stock);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "stock/" + id);
  }
}
