import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000"
  httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseurl + "/produtos/", { headers: this.httpHeaders })
  }
  getOneProduct(id: any): Observable<any> {
    return this.http.get(this.baseurl + "/produtos/" + id + "/", { headers: this.httpHeaders })
  }

  updateProduct(product: any): Observable<any> {
    const body = { name: product.name, description: product.description, price: product.price };
    return this.http.put(this.baseurl + "/produtos/" + product.id + "/", body, { headers: this.httpHeaders })
  }
  createProduct(product: any): Observable<any> {
    const body = { name: product.name, description: product.description, price: product.price};
    return this.http.post(this.baseurl + "/produtos/", body, { headers: this.httpHeaders })
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.baseurl + "/produtos/" + id + "/", { headers: this.httpHeaders })
  }
}
