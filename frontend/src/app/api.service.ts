import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ })

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseurl + "/produtos/", { headers: this.httpHeaders })
  }
  getOneProduct(id: any): Observable<any> {
    return this.http.get(this.baseurl + "/produtos/" + id + "/", { headers: this.httpHeaders })
  }

  getProductsByCategory(category: any): Observable<any> {
    console.log(category)
    return this.http.get(this.baseurl + "/produtos/?categoria=" + category, { headers: this.httpHeaders })
  }
  
  createProduct(formData: any): Observable<any> {
    return this.http.post(this.baseurl + "/produtos/", formData)
  }

  updateProduct(product : any, formData: any): Observable<any> {
    return this.http.put(this.baseurl + "/produtos/" + product.id + "/", formData)
  }


  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.baseurl + "/produtos/" + id + "/", { headers: this.httpHeaders })
  }

}
