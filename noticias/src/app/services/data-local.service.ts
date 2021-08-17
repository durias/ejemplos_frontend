import { Injectable, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage'
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService{

  noticias:Article[]=[];
  constructor(private storage:Storage) { 
    this.storage.create()
    this.cargarFavoritos();
  }

 

  guardarNoticia(noticia:Article){
    
    //console.log(this.storage.length())
    const existe=this.noticias.find(noti=>noti.title===noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
    this.storage.set('favoritos',this.noticias);
    }

    

  }

  async cargarFavoritos(){
      const favoritos= await this.storage.get('favoritos');

      if(favoritos){
        console.log('Async await',favoritos);
      this.noticias=favoritos;
      }
      
    }

    borrarNoticia(noticia:Article){
      this.noticias=this.noticias.filter(noti=>noti.title!==noticia.title);
      this.storage.set('favoritos',this.noticias);
    }

}
