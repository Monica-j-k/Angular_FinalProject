import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  get(http: any): any {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://localhost:4500/products") 
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:4500/foodList", data);
  }

  getProduct2(){
    return this.http.get<any>("http://localhost:4500/foodList");
  }
}
