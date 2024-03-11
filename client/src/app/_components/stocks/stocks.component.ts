import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  stockForm: FormGroup;
  isEditing = false;
  editingStockId: number | null = null;

  constructor(private stockService: StockService, private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      qty: [0, Validators.required],
      productId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getStocks().subscribe({
      next: (stocks) => this.stocks = stocks,
      error: (error) => console.error('There was an error!', error)
    });
  }

  onSubmit() {
    if (this.isEditing) this.updateStock();
    else this.addStock();
  }

  addStock() {
    if (this.stockForm.valid) {
      this.stockService.createStock(this.stockForm.value).subscribe({
        next: (stock) => {
          this.stocks.push(stock);
          this.resetForm();
        },
        error: (error) => console.error('Error adding stock', error)
      });
    }
  }

  editStock(stock: Stock) {
    this.isEditing = true;
    this.editingStockId = stock.id;
    this.stockForm.setValue({
      qty: stock.qty,
      productId: stock.product.id
    });
  }

  updateStock() {
    if (this.stockForm.valid && this.editingStockId !== null) {
      let updatedStock = { ...this.stockForm.value, id: this.editingStockId };
      this.stockService.updateStock(updatedStock).subscribe({
        next: () => {
          let index = this.stocks.findIndex(s => s.id === this.editingStockId);
          this.stocks[index] = updatedStock;
          this.resetForm();
        },
        error: (error) => console.error('Error updating stock', error)
      });
    }
  }

  deleteStock(id: number) {
    this.stockService.deleteStock(id).subscribe({
      next: () => this.stocks = this.stocks.filter(stock => stock.id !== id),
      error: (error) => console.error('Error deleting stock', error)
    });
  }

  resetForm() {
    this.stockForm.reset();
    this.isEditing = false;
    this.editingStockId = null;
  }
}
