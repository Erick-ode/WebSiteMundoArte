import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './criar-categoria/category-list.component';
import { RedesSociaisComponent } from './redes-sociais/redes-sociais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component'; 
import { CadastrarProdutosComponent}  from './produtos/cadastrar-produtos.component';
import { AdminComponent } from './admin/admin.component';
import { SubcategoriaComponent } from './criar-categoria/subcategoria/subcategoria.component';


const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicial', pathMatch: 'full' }, 
  { path: 'criar-categorias', component: CategoryListComponent },
  { path: 'redes-sociais', component: RedesSociaisComponent },
  { path: 'endereco', component: EnderecoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'pagina-inicial', component: PaginaInicialComponent },
  { path: 'criar-produtos', component: CadastrarProdutosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'subcategorias/:id', component: SubcategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
