import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isEditing = false;
  editingProductId: number | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (error) => console.error('There was an error!', error)
    });
  }

  onSubmit() {
    if (this.isEditing) this.updateProduct();
    else this.addProduct();
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (product) => {
          this.products.push(product);
          this.resetForm();
        },
        error: (error) => console.error('Error adding product', error)
      });
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.editingProductId = product.id;
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      value: product.value
    });
  }

  updateProduct() {
    if (this.productForm.valid && this.editingProductId !== null) {
      let updatedProduct = { ...this.productForm.value, id: this.editingProductId };
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          let index = this.products.findIndex(p => p.id === this.editingProductId);
          this.products[index] = updatedProduct;
          this.resetForm();
        },
        error: (error) => console.error('Error updating product', error)
      });
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.products = this.products.filter(product => product.id !== id),
      error: (error) => console.error('Error deleting product', error)
    });
  }

  resetForm() {
    this.productForm.reset();
    this.isEditing = false;
    this.editingProductId = null;
  }
}
