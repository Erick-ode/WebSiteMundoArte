import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { CategoryListService } from '../criar-categoria/category-list.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
  providers: [ApiService, CategoryListService]
})

export class CadastrarProdutosComponent implements OnInit {
  products = [{ name: '', category: null as number | null, subcategory: null as number | null, price: 0.0, image: null }];
  selectedProduct;
  product = { name: '', category: null, subcategory: null, price: 0.0, image: null };
  imageUrl: any;
  
  showCreateForm: boolean = false; 
  showUpdateForm: boolean = false; 
  filterCategory: number = 0;
  showForm: boolean = false; 
  subcategories: any[] = [];
  selectedSubcategory: number;
  selectedCategory: number = -1;


  isProductUpdate: boolean = false;
  categories: any[] = [];
  selectedSubcategories = [];

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private api: ApiService,
    private apiCategory: CategoryListService,
    private elRef: ElementRef
    
   
  ) {
    this.selectedProduct = { id: -1, name: '', category: null as number | null, subcategory: null as number | null, price: 0.0, image: null };    this.selectedSubcategory = -1;
    this.selectedCategory = -1;
    
  }

  onCategoryChange(event: any) {
    this.selectedCategory = +event.target.value;  // O '+' converte a string para número
    this.updateSelectedSubcategories();
}

getSubcategoryName(subcategoryId: any): string {
  const subcategory = this.subcategories.find(sc => sc.id === subcategoryId);
  return subcategory ? subcategory.name : '';
}

  
  goToAdminPage() {
    this.router.navigate(['/admin']);
  }

  showCreation(event: any) {
    event.stopPropagation();
    this.showForm = true;
    this.isProductUpdate = false;
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    if (this.categories && this.categories.length > 0) {
      this.selectedCategory = this.categories[0].id;
  }
  }

  getBaseUrl = (): string => {
    return this.api.baseurl;
  }

  productClicked = (product: any) => {
    this.api.getOneProduct(product.id).subscribe(
        data => {
            this.selectedProduct = data;
            this.selectedCategory = data.category;
            this.selectedSubcategory = data.subcategory;
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

  createProduct = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category.toString() : '');
    formData.append('subcategory', this.selectedSubcategory ? this.selectedSubcategory.toString() : '');
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
    formData.append('category', this.selectedProduct.category ? this.selectedProduct.category.toString() : '');
    formData.append('subcategory', this.selectedSubcategory ? this.selectedSubcategory.toString() : '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('image', this.selectedProduct.image ? this.selectedProduct.image : '');

    this.api.updateProduct(this.selectedProduct, formData).subscribe(
      () => {
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

  deselectProduct() {
    this.isProductUpdate = false;
    this.selectedProduct = { id: -1, name: '', category: null as number | null, subcategory: null as number | null, price: 0.0, image: null };  }
  
  getCategoryName = (categoryId: any): string => {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  getCategories = () => {
    this.apiCategory.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      function (error) {
        console.log(error);
      }
    );
  }

  hideForm() {
    this.showForm = false;
    this.isProductUpdate = false;
    this.selectedProduct = { id: -1, name: '', category: null as number | null, subcategory: null as number | null, price: 0.0, image: null };  }


  updateSelectedSubcategories() {
    console.log('Categoria selecionada:', this.selectedCategory);
    this.api.getAllSubcategories(this.selectedCategory).subscribe(
        (data: any) => {
            console.log('Subcategorias recebidas:', data);
            this.subcategories = data;
            this.cdRef.detectChanges();
        },
        (error: any) => {
            console.log('Erro ao buscar subcategorias:', error);
        }
    );
  }
  
  
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target) && this.showForm) {
      this.hideForm();
    }
  }
}