import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodList } from '../user/userhome/product-grid/product-grid.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  postIdea(temp: any){
    throw new Error('Method not implemented.');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      })
  }
  constructor(private http:HttpClient
    ) { 
      
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization":  "Bearer "+sessionStorage.getItem("token")
        })
      }
    }
  public getProducts():Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization":  "Bearer "+sessionStorage.getItem("token")
      })
    }
    return this.http.get("http://localhost:4500/660/products",this.httpOptions);
  }

  public getFoodList():Observable<any>{
  
    return this.http.get<any>(`${environment.apiUrl}/foodList`,this.httpOptions);
  }

  public getProducts2(pattern:string):Observable<any>{
    return this.http.get("http://localhost:4500/660/products?type="+pattern,this.httpOptions);
  }

  addProduct<T>({ model }: { model: T; headers?: HttpHeaders; }): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/products`, JSON.stringify(model), { headers: this.headers });
  }

  deleteProduct(id) {
   return this.http.delete(`${environment.apiUrl}/foodList/${id}`);
  }

}

