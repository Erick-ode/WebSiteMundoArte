import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {path: 'produtos', component: AppComponent},
  { path: 'categorias', component: CategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
