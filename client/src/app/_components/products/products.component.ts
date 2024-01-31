import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.getProducts().subscribe({
            next: (products) => this.products = products,
            error: (error) => console.error('There was an error!', error)
        });
    }
}
