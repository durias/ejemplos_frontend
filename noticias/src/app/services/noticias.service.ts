import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey=environment.apiKey;
const apiUrl=environment.apiUrl;

const headers= new HttpHeaders({
  'X-Api-key':apiKey

});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage:number=0;
  categoriaActual="";
  categoriaPage=0;

  constructor( private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query=apiUrl+query;
    console.log(query);
    return this.http.get<T>(query,{headers});
  }

  getTopHeadLines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

  }
  getTopHeadLinesCategoria(categoria:string){
    if(this.categoriaActual===categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
   
  }

}
