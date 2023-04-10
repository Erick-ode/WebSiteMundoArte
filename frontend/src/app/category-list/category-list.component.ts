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
  selectedCategory;

  isCategoryUpdate: boolean = false;

  constructor(private api: CategoryListService) {
    this.selectedCategory = { id: -1, name: ''};

  }

  ngOnInit() {
    this.getCategories();
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
