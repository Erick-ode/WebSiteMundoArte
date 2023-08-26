import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryListService } from './category-list.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryListService]
})
export class CategoryListComponent implements OnInit{
  categories: any[] = [];
  category = { name: '' };
  
  subcategories: any[] = [];
  subcategory = { name: '', category: null };

  selectedCategory;
  selectedSubcategory;

  isCategoryUpdate: boolean = false;
  isSubcategoryUpdate: boolean = false;

  filterCategory: number = 0;

  constructor(private api: CategoryListService) {
    this.selectedCategory = { id: -1, name: ''};
    this.selectedSubcategory = {id: -1, name: '', category: null}
  }

  ngOnInit() {
    this.getCategories();
    this.getSubcategories();
  }

  categoryClicked = (category: any) => {
    this.api.getOneCategory(category.id).subscribe(
      data => {
        console.log(category)
        this.getSubcategories(category.id);
        console.log(this.subcategories)
        this.selectedCategory = data;
        this.isCategoryUpdate = true;
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

  createCategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedCategory.name);

    this.api.createCategory(formData).subscribe(
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

  // Subcategorias

  subcategoryClicked = (subcategory: any) => {
    this.api.getOneSubcategory(subcategory.id).subscribe(
      data => {
        this.selectedSubcategory = data;
        this.isSubcategoryUpdate = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubcategories = (categoryId?: number)=> {
    if(categoryId){
      this.api.getSubCategoryByCategory(categoryId).subscribe(
        data => {
        
          this.subcategories = data;
          this.isSubcategoryUpdate = false;
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.api.getAllSubcategories().subscribe(
      data => {
        
        this.subcategories = data;
        this.isSubcategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
    }
        
  }

  createSubcategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedSubcategory.name);
    formData.append('category', this.selectedSubcategory.category ? this.selectedSubcategory.category : '');

    this.api.createSubcategory(formData).subscribe(
      data => {
        this.getCategories();
        this.getSubcategories();
        form.resetForm();
        this.isSubcategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateSucategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('category', this.selectedSubcategory.category ? this.selectedSubcategory.category : '');

    this.api.updateSubcategory(this.selectedSubcategory, formData).subscribe(
      data => {
        this.getCategories();
        this.getSubcategories();
        form.resetForm();
        this.isSubcategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteSubcategory = () => {
    this.api.deleteSubcategory(this.selectedSubcategory.id).subscribe(
      data => {
        this.getCategories();
        this.getSubcategories();
      },
      error => {
        console.log(error);
      }
    );
  }

}
