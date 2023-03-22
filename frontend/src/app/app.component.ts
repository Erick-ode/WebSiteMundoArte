import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  products = [{name: ""}];
  categories : any[] | undefined;
  selectedProduct;

  product = {
    name: '',
    category: '',
    price: '',
    image: null
  };

  constructor(private api: ApiService) {
    this.getProducts();
    this.selectedProduct = { id: -1, name: '', category: '', price: 0.0 };

  }

  ngOnInit(): void {
    this.api.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
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

  onImageSelected(event: any) {
    this.product.image = event.target.files[0];
  }

  submitForm() {
    this.api.createProduct(this.product).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}