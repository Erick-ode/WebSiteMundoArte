import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { CategoryListService } from '../criar-categoria/category-list.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
  providers: [ApiService, CategoryListService]
})
export class PaginaInicialComponent implements OnInit {
  products: { name: string; category: any; price: number; image: any; }[] = [{ name: '', category: null, price: 0.0, image: null }];
  selectedProduct: { id: number; name: string; category: any; price: number; image: any; } = { id: -1, name: '', category: null, price: 0.0, image: null };
  product = { name: '', category: null, price: 0.0, image: null };
  imageUrl: any;
  
  public showCategories = false;
  public showForm = false;
  public showFilter = false;
  public showSubCategories = false;

  filterCategory: number = 0;
  filterSubcategory: number = 0;
  isProductUpdate: boolean = false;
  categories: any[] = [];
  subcategories: any[]= [];

  constructor(private api: ApiService, private apiCategory: CategoryListService) {}

  ngOnInit(): void {
    this.getProducts(this.filterCategory);
    this.getCategories();
  }

  getBaseUrl(): string {
    return this.api.baseurl;
  }

  productClicked(product: any): void {
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

  setFilterCategory(categoryId: number): void {
    this.filterCategory = categoryId;
    this.getProducts(categoryId);
  }

  onImageSelected(event: any): void {
    this.selectedProduct.image = event.target.files[0];
  }

  getProducts(categoryId?: number): void {
    if (categoryId) {
      this.getProductsByCategory(categoryId);
    } else {
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
      (data: any) => {
        this.products = data;
        this.isProductUpdate = false;
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  createProduct(form: NgForm): void {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('category', this.selectedProduct.category);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image);

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


  deleteProduct(): void {
    this.api.deleteProduct(this.selectedProduct.id).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoryName(categoryId: any): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  getCategories(): void {
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
    const subcategory = this.subcategories.find((sc: { id: any; }) => sc.id === subcategoryId);
    return subcategory ? subcategory.name : '';
  }

  getSubcategories = (categoryId?: number) => {
    this.apiCategory.getAllSubcategories(categoryId).subscribe({
      next: data => {
        this.subcategories = data;
      },
      error: error => {
        console.log(error);
      }
    });
}


  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }

  toggleSubCategories(): void {
    this.showSubCategories = !this.showSubCategories;
  }

  clearFilterCategory(): void {
    this.filterCategory = 0;
    this.getProducts();
  }

  toggleCategory(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const subCategory = targetElement.nextElementSibling as HTMLElement;
    subCategory.classList.toggle('show');
  }
}
