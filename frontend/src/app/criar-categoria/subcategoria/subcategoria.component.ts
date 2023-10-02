import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryListService } from '../category-list.service';




@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css'],
  providers: [CategoryListService]
})
export class SubcategoriaComponent implements OnInit {

  subcategories: any[] = [];
  subcategory = { name: '', category: null };
  selectedSubcategory;
  categoryName: string = '';


  categoryId: number = -1; 
  isSubcategoryUpdate: boolean = false;

  constructor(private api: CategoryListService, private route: ActivatedRoute, private router: Router) {
    this.selectedSubcategory = {id: -1, name: '', category: null}
  }

  goToCategorias() {
    this.router.navigate(['/criar-categorias'])
}

  

ngOnInit() {
  const routeId = this.route.snapshot.paramMap.get('id');
  this.categoryId = routeId ? +routeId : -1;

  if (this.categoryId !== -1) {
      this.api.getOneCategory(this.categoryId).subscribe(
          data => {
              this.categoryName = data.name; // Assumindo que a resposta tem um campo 'name'
              this.getSubcategories();
          },
          error => {
              console.log(error);
          }
      );
  }
}

  
getSubcategories = () => {
  this.api.getSubCategoryByCategory(this.categoryId).subscribe(
    data => {
      this.subcategories = data;
      console.log(data)
      this.isSubcategoryUpdate = false;
    },
    error => {
      console.log(error);
    }
  );
}

  
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

  createSubcategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedSubcategory.name);
    formData.append('category', this.categoryId.toString()); // Passando a ID da categoria diretamente
  
    this.api.createSubcategory(formData).subscribe(
      data => {
        this.getSubcategories();
        form.resetForm();
        this.isSubcategoryUpdate = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  updateSubcategory = (form: NgForm) => {
    const formData = new FormData();
    formData.append('name', this.selectedSubcategory.name);
    formData.append('category', this.selectedSubcategory.category ? this.selectedSubcategory.category : '');

    this.api.updateSubcategory(this.selectedSubcategory, formData).subscribe(
      data => {
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
        this.getSubcategories();
      },
      error => {
        console.log(error);
      }
    );
  }
}
