import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Stock } from "../models/stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.baseUrl + "stock");
    }
}
