import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias:Article[]=[];
  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines()
    .subscribe(resp=>{
      console.log('noticias',resp);
        this.noticias.push(...resp.articles);
        console.log('total news',resp.articles.length);
        if(event){
          event.target.complete();
          if(resp.articles.length==0){
            event.target.disabled=true;
          }
        }

      });
  }

}
