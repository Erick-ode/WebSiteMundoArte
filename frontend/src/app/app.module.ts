import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryListComponent } from './criar-categoria/category-list.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EnderecoComponent } from './endereco/endereco.component';
import { SobreComponent } from './sobre/sobre.component';
import { RedesSociaisComponent } from './redes-sociais/redes-sociais.component';
import { CadastrarProdutosComponent } from './produtos/cadastrar-produtos.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ClickOutsideDirective } from './criar-categoria/clickOutside.directive';
import { AdminComponent } from './admin/admin.component';
import { SubcategoriaComponent } from './criar-categoria/subcategoria/subcategoria.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    EnderecoComponent,
    SobreComponent,
    AdminComponent,
    RedesSociaisComponent,
    CadastrarProdutosComponent,
    PaginaInicialComponent,
    ClickOutsideDirective,
    SubcategoriaComponent,
    
  ],
  imports: [ 
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
