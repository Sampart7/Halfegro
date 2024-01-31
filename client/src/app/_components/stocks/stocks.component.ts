import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit{
  stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getProducts().subscribe({
        next: (stocks) => this.stocks = stocks,
        error: (error) => console.error('There was an error!', error)
    });
}

}
