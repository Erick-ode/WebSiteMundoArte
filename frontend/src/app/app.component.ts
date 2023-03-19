import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  products = [{name: ""}];
  selectedProduct;

  constructor(private api: ApiService) {
    this.getProducts();
    this.selectedProduct = { id: -1, name: '', description: '', price: 0.0 };
  }
  getProducts = () => {
    this.api.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  productClicked = (product: { id: any; }) => {
    this.api.getOneProduct(product.id).subscribe(
      data => {
        this.selectedProduct = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProduct = () => {
    this.api.updateProduct(this.selectedProduct).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  createProduct = () => {
    this.api.createProduct(this.selectedProduct).subscribe(
      data => {
        this.products.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProduct = () => {
    this.api.deleteProduct(this.selectedProduct.id).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }
}