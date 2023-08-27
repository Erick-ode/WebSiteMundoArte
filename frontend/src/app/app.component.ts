import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { CategoryListService } from './category-list/category-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, CategoryListService]
})
export class AppComponent implements OnInit{
  products = [{ name: '', category: null, subcategory: null, price: 0.0, image: null }];
  selectedProduct;
  product = { name: '', category: null, subcategory: null, price: 0.0, image: null };
  imageUrl: any;

  filterCategory: number = 0;
  filterSubcategory: number = 0;

  isProductUpdate: boolean = false;

  categories: any[] = [];
  
  subcategories: any[]= [];

  constructor(private api: ApiService, private apiCategory: CategoryListService) {
    this.selectedProduct = { id: -1, name: '', category: null, subcategory: null, price: 0.0, image: null };
  }

  ngOnInit() {
    this.getProducts(this.filterCategory);
    this.getCategories();
    this.getSubcategories();
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


  getProducts = (categoryId?: number, subcategoryId?: number) => {
    if (subcategoryId){
      this.getProductsBySubcategory(subcategoryId);
    } else if(categoryId){
      this.getProductsByCategory(categoryId);
    }
    else{
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

  getProductsByCategory = (category: number ) => {
    this.api.getProductsByCategory(category).subscribe(
      data => {
        this.products = data;
        this.isProductUpdate = false;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  getProductsBySubcategory = (subcategory: number ) => {
    this.api.getProductsBySubCategory(subcategory).subscribe(
      data => {
        this.products = data;
        this.isProductUpdate = false;
        console.log(this.products)
      },
      error => {
        console.log(error);
      }
    );
  }

  createProduct = (form: NgForm) => {
    const formData = new FormData();

    formData.append('name', this.selectedProduct.name);
    formData.append('subcategory', this.selectedProduct.subcategory ? this.selectedProduct.subcategory : '');
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category : '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image ? this.selectedProduct.image : '');

    this.api.createProduct(formData).subscribe(
      data => {
        this.products.push(data);
        form.resetForm();
        this.isProductUpdate = false;
        console.log(this.products)
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
    formData.append('subcategory', this.selectedProduct.subcategory ? this.selectedProduct.subcategory : '');
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

  getSubcategoryName = (subcategoryId: any): string => {
    const subcategory = this.subcategories.find(sc => sc.id === subcategoryId);
    return subcategory ? subcategory.name : '';
  }

  getSubcategories = () => {
    this.apiCategory.getAllSubcategories().subscribe(
      data => {
        this.subcategories = data;
      },
      error => {
        console.log(error);
      }
    );
  }


}