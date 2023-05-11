import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from './produtos';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint = 'http://localhost:3000/produtos';

  constructor(public http: HttpClient) { }

  public getProdutos(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>(this.endpoint)
  }

  addProdutos(p: Produtos): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post(this.endpoint, JSON.stringify(p), httpOptions)
  }

  updateProdutos(id: number, p: Produtos): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.put(this.endpoint+"/"+id, JSON.stringify(p),httpOptions)
  }

  deleteProdutos(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.delete(this.endpoint+"/"+id)
  }
}
