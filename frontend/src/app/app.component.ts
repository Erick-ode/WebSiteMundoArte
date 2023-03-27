import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  products = [{ name: '', category: null, price: 0.0, image: null }];
  selectedProduct;
  product = { name: '', category: null, price: 0.0, image: null };
  imageUrl: any;

  categories: any[] = [];
  category = { name: '' };
  selectedCategory;

  isProductUpdate: boolean = false;
  isCategoryUpdate: boolean = false;

  constructor(private api: ApiService) {
    this.getProducts();
    this.selectedProduct = { id: -1, name: '', category: null, price: 0.0, image: null };
    this.selectedCategory = { id: -1, name: ''};

  }

  ngOnInit(): void {
    this.api.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  getBaseUrl = (): string => {
    return this.api.baseurl
  }

  productClicked = (product: any) => {
    this.api.getOneProduct(product.id).subscribe(
      data => {
        this.selectedProduct = data;
        this.isProductUpdate = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  onImageSelected = (event: any) => {
    this.selectedProduct.image = event.target.files[0];
  }

  createProduct = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category : '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image ? this.selectedProduct.image : '');

    this.api.createProduct(formData).subscribe(
      data => {
        this.products.push(data);
        form.resetForm();
        this.isProductUpdate = false;
      },
      error => {
        console.log(error);
      }
    );

  }

  getProducts = () => {
    this.api.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.isProductUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  getProductsByCategory = () => {
    this.api.getProductsByCategory(this.selectedProduct.category).subscribe(
      data => {
        this.products = data;
        this.isProductUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProduct = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category : '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image ? this.selectedProduct.image : '');

    this.api.updateProduct(this.selectedProduct, formData).subscribe(
      data => {
        this.getProducts();
        form.reset();
        this.isProductUpdate = false;
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
        //this.deleteProductImage();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProductImage = () =>{
    this.api.deleteProductImage(this.selectedProduct.id).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoryName = (categoryId: any): string => {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  categoryClicked = (category: any) => {
    this.api.getOneCategory(category.id).subscribe(
      data => {
        this.selectedCategory = data;
        this.isCategoryUpdate = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  createCategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedCategory.name);

    this.api.updateCategory(this.selectedCategory, formData).subscribe(
      data => {
        this.getCategories();
        form.resetForm();
        this.isCategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.categories = data;
        this.isCategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.category.name);

    this.api.updateCategory(this.selectedCategory, formData).subscribe(
      data => {
        this.getCategories();
        form.resetForm();
        this.isCategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCategory = () => {
    this.api.deleteCategory(this.selectedCategory.id).subscribe(
      data => {
        this.getCategories();
      },
      error => {
        console.log(error);
      }
    );
  }

}