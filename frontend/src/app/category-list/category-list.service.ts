import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {

    baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ })


  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseurl + "/categorias/", { headers: this.httpHeaders })
  }

  getOneCategory(id: any): Observable<any> {
    return this.http.get(this.baseurl + "/categorias/" + id + "/", { headers: this.httpHeaders })
  }

  createCategory(formData: any): Observable<any> {
    return this.http.post(this.baseurl + "/categorias/", formData)
  }

  updateCategory(category : any, formData: any): Observable<any> {
    return this.http.put(this.baseurl + "/categorias/" + category.id + "/", formData)
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.baseurl + "/categorias/" + id + "/", { headers: this.httpHeaders })
  }
}
