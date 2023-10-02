import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { CategoryListService } from './criar-categoria/category-list.service';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, CategoryListService]
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  products = [{ name: '', category: null, price: 0.0, image: null }];
  selectedProduct;
  product = { name: '', category: null, price: 0.0, image: null };
  imageUrl: any;
  
  public showCategories = true;
  public showForm = true;

  filterCategory: number = 0;

  isProductUpdate: boolean = false;

  categories: any[] = [];

  constructor(private api: ApiService, private apiCategory: CategoryListService,private viewportScroller: ViewportScroller) {
    this.selectedProduct = { id: -1, name: '', category: null, price: 0.0, image: null };
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
}

  ngOnInit() {
    this.getProducts(this.filterCategory);
    this.getCategories();
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

  getProducts = (categoryId?: number) => {
    if (categoryId){
      this.getProductsByCategory(categoryId);
    }else{
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
  }

  getProductsByCategory = (category: number) => {
    this.api.getProductsByCategory(category).subscribe(
      (data: any) => {
        this.products = data;
        this.isProductUpdate = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  updateProduct = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category : '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image ? this.selectedProduct.image : '');

    this.api.updateProduct(this.selectedProduct, formData).subscribe(
      (      data): void => {
        this.getProducts();
        form.reset();
        this.isProductUpdate = false;
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

  getCategories = () => {
    this.apiCategory.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }
}
